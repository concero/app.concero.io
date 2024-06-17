import { type Address, createPublicClient, type PublicClient, http, type WalletClient, erc20Abi } from 'viem'

import { type Route, Step, type RouteData, type SwapDirectionData } from './types'
import ConceroJson from './assets/contractsData/Concero.json'
import { addingAmountDecimals } from '../utils/formatting'
import { viemChains } from './configs/chainsConfig'

export const conceroAddressesMap: Record<string, `0x${string}`> = {
	'421614': '0xe040812bFB023f53AE928647635a863d8309C7ec', // arb
	'11155420': '0x3055cC530B8cF18fD996545EC025C4e677a1dAa3', // opt
	'84532': '0x68bF17c2c22A90489163c9717ae2ad8eAa9d43aE', // base
}

export const chainSelectorsMap: Record<string, string> = {
	'421614': '3478487238524512106',
	'11155420': '5224473277236331295',
	'84532': '10344971235874465080',
}

type TxName = 'swap' | 'bridge' | 'swapAndBridge'

const createBigIntAmount = (amount: string, decimals: number) => {
	return BigInt(addingAmountDecimals(amount, decimals)!)
}

const checkAllowanceAndApprove = async (
	walletClient: WalletClient,
	publicClient: PublicClient,
	txData: SwapDirectionData,
	clientAddress: Address,
) => {
	const { token, amount, chain } = txData

	const allowance = await publicClient.readContract({
		abi: erc20Abi,
		functionName: 'allowance',
		address: token.address,
		args: [clientAddress, conceroAddressesMap[chain.id]],
	})

	console.log('allowance: ', allowance)

	let approveTxHash = null

	const amountInDecimals = createBigIntAmount(amount, token.decimals)

	if (allowance < amountInDecimals) {
		const { request } = await publicClient.simulateContract({
			account: clientAddress,
			address: token.address,
			abi: erc20Abi,
			functionName: 'approve',
			args: [
				conceroAddressesMap[chain.id] ?? conceroAddressesMap['421614'], // TODO change mock dst chain
				amountInDecimals,
			],
		})

		approveTxHash = await walletClient.writeContract(request)
	}

	console.log('approveTxHash: ', approveTxHash)

	if (approveTxHash) {
		await publicClient.waitForTransactionReceipt({ hash: approveTxHash })
	}
}

const buildRouteData = (routeData: RouteData, clientAddress: Address) => {
	const { steps } = routeData

	let bridgeData = null
	const srcSwapData = []
	const dstSwapData = []

	for (let i = 0; i < steps.length; i++) {
		const currentStep = steps[i]

		const { from, to } = currentStep
		const { type } = currentStep.tool

		const fromAmount = createBigIntAmount(from.amount, from.token.decimals)
		const toAmount = createBigIntAmount(to.amount, to.token.decimals)

		if (type === 'bridge') {
			bridgeData = {
				tokenType: 1,
				amount: fromAmount,
				minAmount: 0n, // TODO this prop is WIP
				dstChainSelector: BigInt(chainSelectorsMap[to.chainId] || chainSelectorsMap['421614']), // TODO change mock dst chain
				receiver: clientAddress,
			}

			continue
		}

		if (type === 'swap') {
			// TODO add dexData and refactor tokenType, amountMin
			const swapData = {
				tokenType: 3, // UniswapV3Single
				fromToken: from.token.address,
				fromAmount,
				toToken: to.token.address,
				toAmount,
				toAmountMin: 0n,
			}

			// if bridgeData does not exist, then it is src step
			// or it exist, then it is dst step
			bridgeData ? dstSwapData.push(swapData) : srcSwapData.push(swapData)
		}
	}

	return { srcSwapData, bridgeData, dstSwapData }
}

// const sendTransaction = () => {

// }

const executeRouteBase = async (walletClient: WalletClient, route: Route, callbackFn: Function) => {
	if (!route) {
		throw new Error('Route is not passed!')
	}

	console.log('route: ', route)

	const { data } = route

	if (data.to.amount === '0' || data.to.amount === '') {
		throw new Error('Amount is empty!')
	}

	if (data.from.token.address === data.to.token.address) {
		throw new Error('Tokens are the same!')
	}

	await walletClient.switchChain({ id: Number(data.from.chain.id) })

	const [clientAddress] = await walletClient.requestAddresses()

	const publicClient = createPublicClient({
		chain: viemChains[data.from.chain.id].chain,
		transport: http(viemChains[data.from.chain.id].transport),
	})

	const { srcSwapData, bridgeData, dstSwapData } = buildRouteData(data, clientAddress)
	await checkAllowanceAndApprove(walletClient, publicClient, data.from, clientAddress)

	let txName: TxName = 'swap'
	let args = [srcSwapData]

	if (srcSwapData.length > 0 && bridgeData) {
		txName = 'swapAndBridge'
		args = [bridgeData, srcSwapData, dstSwapData]
	}
	if (srcSwapData.length === 0 && bridgeData) {
		txName = 'bridge'
		args = [bridgeData, dstSwapData]
	}

	console.log('txName: ', txName)

	const gasPrice = await publicClient.getGasPrice()

	// TODO refactor it
	const { request } = await publicClient.simulateContract({
		abi: ConceroJson.abi,
		functionName: txName,
		address: conceroAddressesMap[data.from.chain.id],
		args,
		gasPrice,
		gas: 4_000_000n,
	})

	const approveTxHash = await walletClient.writeContract(request)
	console.log('approve tx: ', approveTxHash)
}

// TODO add switchChain arg
// TODO rewirte status on web sockets (chqeck safely)

export const executeRoute = async (wallectClient: WalletClient, route: Route, callbackFn: Function) => {
	try {
		await executeRouteBase(wallectClient, route, callbackFn)
	} catch (error) {
		console.log(error)
		throw new Error(String(error))
	}
}
