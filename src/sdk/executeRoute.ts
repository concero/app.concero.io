import { type Address, createPublicClient, type PublicClient, http, type WalletClient, erc20Abi } from 'viem'
import { type Route, type RouteData, type SwapDirectionData } from './types/routeTypes'
import { type InputSwapData, type BridgeData, type InputRouteData, type TxName, type SwapArgs } from './types/contractInputTypes'

import ConceroJson from './assets/contractsData/Concero.json'

import { viemChains } from './configs/chainsConfig'
import { conceroAddressesMap } from './configs/conceroAddressesMap'
import { chainSelectorsMap } from './configs/chainSelectorsMap'

import { createBigIntAmount } from './utils/formatting'
import { ExecuteRouteStage, type ExecutionConfigs, type ExecutionState } from './types/executeSettingsTypes'

const useSendStateHook = (executionConfigs: ExecutionConfigs) => {
	const { executionStateUpdateHook, executeInBackground } = executionConfigs

	return (state: ExecutionState) => {
		if (!executeInBackground && executionStateUpdateHook) {
			executionStateUpdateHook(state)
		}
	}
}

const checkAllowanceAndApprove = async (
	walletClient: WalletClient,
	publicClient: PublicClient,
	txData: SwapDirectionData,
	clientAddress: Address,
) => {
	const { token, amount, chain } = txData

	const conceroAddress = conceroAddressesMap[chain.id] ?? conceroAddressesMap['421614'] // TODO change mock dst chain

	const allowance = await publicClient.readContract({
		abi: erc20Abi,
		functionName: 'allowance',
		address: token.address,
		args: [clientAddress, conceroAddress],
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
			args: [conceroAddress, amountInDecimals],
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

	let bridgeData: BridgeData | null = null
	const srcSwapData: InputSwapData[] = []
	const dstSwapData: InputSwapData[] = []

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

const sendTransaction = async (
	txArgs: InputRouteData,
	publicClient: PublicClient,
	walletClient: WalletClient,
	conceroAddress: Address,
	clientAddress: Address,
) => {
	const { srcSwapData, bridgeData, dstSwapData } = txArgs

	let txName: TxName = 'swap'
	let args: SwapArgs = [srcSwapData]

	if (srcSwapData.length > 0 && bridgeData) {
		txName = 'swapAndBridge'
		args = [bridgeData, srcSwapData, dstSwapData]
	}
	if (srcSwapData.length === 0 && bridgeData) {
		txName = 'bridge'
		args = [bridgeData, dstSwapData]
	}

	console.log('txName: ', txName)
	console.log('args: ', args)

	const { request } = await publicClient.simulateContract({
		account: clientAddress,
		abi: ConceroJson.abi,
		functionName: txName,
		address: conceroAddress,
		args,
	})

	const approveTxHash = await walletClient.writeContract(request)
	console.log('approve swap tx: ', approveTxHash)
}

const executeRouteBase = async (walletClient: WalletClient, route: Route, executionConfigs: ExecutionConfigs) => {
	if (!walletClient) throw new Error('walletClient is not passed!')

	if (!route) throw new Error('Route is not passed!')

	console.log('route: ', route)

	const { data } = route
	const { switchChainHook } = executionConfigs
	const sendState = useSendStateHook(executionConfigs)

	if (data.to.amount === '0' || data.to.amount === '') throw new Error('Amount is empty!')
	if (data.from.token.address === data.to.token.address) throw new Error('Tokens are the same!')

	sendState({
		stage: ExecuteRouteStage.setChain,
		payload: {
			title: 'Switch chain',
			body: 'Please switch chain in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	if (!switchChainHook) {
		await walletClient.switchChain({ id: Number(data.from.chain.id) })
	} else {
		await switchChainHook(Number(data.from.chain.id))
	}

	sendState({
		stage: ExecuteRouteStage.setAddress,
		payload: {
			title: 'Get client address',
			body: 'Please get access to your address in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	const [clientAddress] = await walletClient.requestAddresses()

	const publicClient = createPublicClient({
		chain: viemChains[data.from.chain.id].chain,
		transport: http(viemChains[data.from.chain.id].transport),
	})

	const inputRouteData: InputRouteData = buildRouteData(data, clientAddress)
	const conceroAddress = conceroAddressesMap[data.from.chain.id]

	console.log(inputRouteData)

	sendState({
		stage: ExecuteRouteStage.checkAllowance,
		payload: {
			title: 'Check allowance',
			body: 'Please input allowance and approve the transaction in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	await checkAllowanceAndApprove(walletClient, publicClient, data.from, clientAddress)

	sendState({
		stage: ExecuteRouteStage.pendingTransaction,
		payload: {
			title: 'Swap in progress',
			body: 'Please check info and approve the transaction in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	await sendTransaction(inputRouteData, publicClient, walletClient, conceroAddress, clientAddress)

	sendState({
		stage: ExecuteRouteStage.successTransaction,
		payload: {
			title: 'Swap execute succesfully!',
			body: 'Check your ballance',
			status: 'success',
			txLink: null,
		},
	})
}

// test bridge and allowance (1 hour)
export const executeRoute = async (signer: WalletClient, route: Route, executionConfigs: ExecutionConfigs) => {
	const sendState = useSendStateHook(executionConfigs)

	try {
		await executeRouteBase(signer, route, executionConfigs)
	} catch (error) {
		sendState({
			stage: ExecuteRouteStage.internalError,
			payload: {
				title: 'Internal error',
				body: String(error),
				status: 'failed',
				txLink: null,
			},
		})

		throw new Error(String(error))
	}
}
