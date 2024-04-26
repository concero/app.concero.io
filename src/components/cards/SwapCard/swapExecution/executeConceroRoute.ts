import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import type { SwitchChainHookType } from '../SwapInput/types'
import { ethers, type providers } from 'ethers'
import { addingAmountDecimals } from '../../../../utils/formatting'
import ERC20 from '../../../../abi/ERC20.json'
import { linkAddressesMap } from '../../../buttons/SwapButton/linkAddressesMap'
import { type Dispatch } from 'react'
import { createPublicClient, decodeEventLog, http } from 'viem'
import { arbitrumSepolia, baseSepolia, optimismSepolia } from 'viem/chains'
import ConceroAbi from '../../../../abi/Concero.json'

const conceroAddressesMap: Record<string, string> = {
	'421614': '0x54FB518991DFd48c4E281544bdDb257E8B738A7E', // arb
	'11155420': '0xce18421b879E8B5d76DC7fbaD3984525F5f7fE3B', // opt
	'84532': '0xE29582Fabd7B0C7Ed428EEdf314e1bED6765262D', // base
}

const chainSelectorsMap: Record<string, string> = {
	'421614': '3478487238524512106',
	'11155420': '5224473277236331295',
	'84532': '10344971235874465080',
}
const viemChainsMap: Record<string, any> = {
	'84532': baseSepolia,
	'11155420': optimismSepolia,
	'421614': arbitrumSepolia,
}

async function checkAllowanceAndApprove(swapState: SwapState, signer: providers.JsonRpcSigner) {
	const bnmContract = new ethers.Contract(swapState.from.token.address, ERC20, signer)
	const linkContract = new ethers.Contract(linkAddressesMap[swapState.from.chain.id], ERC20, signer)

	const [bnmAllowance, linkAllowance] = await Promise.all([
		bnmContract.allowance(signer._address, conceroAddressesMap[swapState.from.chain.id]),
		linkContract.allowance(signer._address, conceroAddressesMap[swapState.from.chain.id]),
	])

	let bnmApproveTx = null
	let linkApproveTx = null

	console.log(bnmAllowance)
	console.log(linkAllowance)

	if (bnmAllowance < Number(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals))) {
		bnmApproveTx = await bnmContract.approve(
			conceroAddressesMap[swapState.from.chain.id],
			addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals),
		)
	}

	if (linkAllowance < Number(addingAmountDecimals('3', 18))) {
		linkApproveTx = await linkContract.approve(
			conceroAddressesMap[swapState.from.chain.id],
			addingAmountDecimals('3', 18),
		)
	}

	if (bnmApproveTx !== null) await bnmApproveTx.wait()
	if (linkApproveTx !== null) await linkApproveTx.wait()
}

async function sendTransaction(swapState: SwapState, signer: providers.JsonRpcSigner) {
	const gasPrice = await signer.provider.getGasPrice()
	const value = gasPrice.mul(1_500_000).toString()
	// let { maxFeePerGas, maxPriorityFeePerGas, gasPrice } = await signer.provider.getFeeData()
	// const totalGas = maxFeePerGas.add(maxPriorityFeePerGas)
	// console.log('Gas price', gasPrice.toString())
	// console.log('Max fee per gas', maxFeePerGas.toString())
	// console.log('Max priority fee per gas', maxPriorityFeePerGas.toString())
	// console.log('Total gas', totalGas.toString())
	// const value = totalGas.mul(1_500_000).toString()
	// console.log('Value', value)

	const conceroContract = new ethers.Contract(
		conceroAddressesMap[swapState.from.chain.id],
		[
			'function startTransaction(address _token, uint8 _tokenType, uint256 _amount, uint64 _destinationChainSelector, address _receiver) external payable',
		],
		signer,
	)

	return conceroContract.startTransaction(
		swapState.from.token.address,
		'0',
		addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals),
		chainSelectorsMap[swapState.to.chain.id],
		swapState.to.address,
		{
			gasPrice,
			gasLimit: 2000000,
			value,
		},
	)
}

async function checkTransactionStatus(
	tx: providers.TransactionResponse,
	signer: providers.JsonRpcSigner,
	swapDispatch: Dispatch<SwapAction>,
	swapState: SwapState,
) {
	const receipt = await tx.wait()
	if (receipt.status === 0) {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: {
				title: 'Transaction failed',
				body: 'The transaction has failed. Please try again',
				status: 'failed',
				txLink: null,
			},
		})
		return
	}

	const publicClient = createPublicClient({
		chain: viemChainsMap[swapState.to.chain.id],
		transport: http(),
	})

	const latestDstChainBlock = await publicClient.getBlockNumber()
	const sleep = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

	const checkLogByName = async (eventName: string) => {
		while (true) {
			let isBreakNeeded = false

			const logs = await publicClient.getLogs({
				address: conceroAddressesMap[swapState.to.chain.id] as `0x${string}`,
				abi: ConceroAbi,
				eventName,
				fromBlock: latestDstChainBlock,
				toBlock: 'latest',
			})

			logs.forEach(log => {
				const dcodedLog = decodeEventLog({
					abi: ConceroAbi,
					data: log.data,
					topics: log.topics,
				})

				if (dcodedLog.eventName === eventName) {
					const { args } = dcodedLog
					if (
						args.sender.toLowerCase() === signer._address.toLowerCase() &&
						args.amount.toString() ===
							addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)
					) {
						isBreakNeeded = true
					}
				}

				console.log(dcodedLog)
			})

			if (isBreakNeeded) break

			await sleep(3000)
		}
	}

	await checkLogByName('UnconfirmedTXAdded')

	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [
			{ status: 'success', title: 'Sending transaction' },
			{
				status: 'pending',
				title: 'Confirming transaction',
			},
		],
	})

	await checkLogByName('TXReleased')

	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [
			{ status: 'success', title: 'Sending transaction' },
			{
				status: 'success',
				title: 'Confirming transaction',
			},
			{
				status: 'success',
				title: 'Complete',
			},
		],
	})
}

export async function executeConceroRoute(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	switchChainHook: SwitchChainHookType,
): Promise<any> {
	try {
		swapDispatch({ type: 'SET_LOADING', payload: true })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.progress })
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: {
				title: 'Action required',
				body: 'Please approve the transaction in your wallet',
				status: 'await',
				txLink: null,
			},
		})

		const signer = await switchChainHook(Number(swapState.from.chain.id))
		await checkAllowanceAndApprove(swapState, signer)
		const tx = await sendTransaction(swapState, signer)

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ status: 'pending', title: 'Sending transaction' }],
		})

		await checkTransactionStatus(tx, signer, swapDispatch, swapState)

		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
	} catch (error) {
		console.error('Error executing concero route', error)
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
		})
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
