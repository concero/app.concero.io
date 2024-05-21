import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import type { SwitchChainHookType } from '../SwapInput/types'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { type Dispatch } from 'react'
import { decodeEventLog, erc20Abi, parseAbi, type WalletClient } from 'viem'
import { arbitrumSepolia, baseSepolia, optimismSepolia } from 'viem/chains'
import ConceroAbi from '../../../../abi/Concero.json'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { linkAddressesMap } from '../../../buttons/SwapButton/linkAddressesMap'
import { readContract, writeContract } from 'viem/actions'
import { getPublicClient, getWalletClient } from '@wagmi/core'
import { config } from '../../../../web3/wagmi'
import { type PublicClient } from 'viem/clients/createPublicClient'

const conceroAddressesMap: Record<string, `0x${string}`> = {
	'421614': '0x646e93db0b93f70A2feC79cf45dF6dF62b0331CF', // arb
	'11155420': '0x896F7Eccf939E5B79938228Cc2C5fE77D6363DDF', // opt
	'84532': '0x4E19030A8d7667712bdC6eB9814d10C159f09044', // base
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

const sleep = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

async function checkAllowanceAndApprove(
	swapState: SwapState,
	srcPublicClient: PublicClient,
	walletClient: WalletClient,
) {
	const [bnmAllowance, linkAllowance] = await Promise.all([
		srcPublicClient.readContract({
			abi: erc20Abi,
			functionName: 'allowance',
			address: swapState.from.token.address as `0x${string}`,
			args: [swapState.from.address as `0x${string}`, conceroAddressesMap[swapState.from.chain.id]],
		}),
		srcPublicClient.readContract({
			abi: erc20Abi,
			functionName: 'allowance',
			address: linkAddressesMap[swapState.from.chain.id] as `0x${string}`,
			args: [swapState.from.address as `0x${string}`, conceroAddressesMap[swapState.from.chain.id]],
		}),
	])

	let bnmApproveTxHash = null
	let linkApproveTxHash = null

	if (bnmAllowance < Number(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals))) {
		bnmApproveTxHash = await writeContract(walletClient, {
			abi: erc20Abi,
			functionName: 'approve',
			address: swapState.from.token.address as `0x${string}`,
			args: [
				swapState.from.address as `0x${string}`,
				BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!),
			],
		})
	}

	if (linkAllowance < Number(addingAmountDecimals('3', 18))) {
		linkApproveTxHash = await writeContract(walletClient, {
			abi: erc20Abi,
			functionName: 'approve',
			address: linkAddressesMap[swapState.from.chain.id] as `0x${string}`,
			args: [conceroAddressesMap[swapState.from.chain.id], BigInt(addingAmountDecimals('3', 18)!)],
		})
	}

	if (bnmApproveTxHash) await srcPublicClient.waitForTransactionReceipt({ hash: bnmApproveTxHash })
	if (linkApproveTxHash) await srcPublicClient.waitForTransactionReceipt({ hash: linkApproveTxHash })
}

async function sendTransaction(swapState: SwapState, srcPublicClient: PublicClient, walletClient: WalletClient) {
	const conceroAbi = parseAbi([
		'function lastGasPrices(uint64 _chainSelector) view returns (uint256)',
		'function startTransaction(address _token, uint8 _tokenType, uint256 _amount, uint64 _destinationChainSelector, address _receiver) external payable',
	])

	const srcLastGasPrice = await readContract(walletClient, {
		abi: conceroAbi,
		functionName: 'lastGasPrices',
		address: conceroAddressesMap[swapState.from.chain.id],
		args: [chainSelectorsMap[swapState.from.chain.id]],
	})

	const dstLastGasPrice = await readContract(walletClient, {
		abi: conceroAbi,
		functionName: 'lastGasPrices',
		address: conceroAddressesMap[swapState.from.chain.id],
		args: [chainSelectorsMap[swapState.to.chain.id]],
	})

	const value = srcLastGasPrice * 750_000n + dstLastGasPrice * 750_000n
	const gasPrice = await srcPublicClient.getGasPrice()

	return await writeContract(walletClient, {
		abi: conceroAbi,
		functionName: 'startTransaction',
		address: conceroAddressesMap[swapState.from.chain.id],
		args: [
			swapState.from.token.address as `0x${string}`,
			0,
			BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!),
			BigInt(chainSelectorsMap[swapState.to.chain.id]),
			swapState.to.address as `0x${string}`,
		],
		value,
		gasPrice,
		gas: 4_000_000n,
	})

	// const { request } = await srcPublicClient.simulateContract({
	// 	abi: conceroAbi,
	// 	functionName: 'startTransaction',
	// 	address: conceroAddressesMap[swapState.from.chain.id],
	// 	args: [
	// 		swapState.from.token.address as `0x${string}`,
	// 		0,
	// 		BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!),
	// 		BigInt(chainSelectorsMap[swapState.to.chain.id]),
	// 		swapState.to.address as `0x${string}`,
	// 	],
	// 	value,
	// })
	// return await writeContract(walletClient, request)
}

const setError = (swapDispatch: Dispatch<SwapAction>, swapState: SwapState, error: any) => {
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
	})

	if (error?.message?.toLowerCase().includes('user rejected')) {
		return
	}

	void trackEvent({
		category: category.SwapCard,
		action: action.SwapFailed,
		label: 'swap_failed',
		data: { provider: 'concero', from: swapState.from, to: swapState.to, error },
	})
}

const getLogByName = async (
	id: string,
	eventName: string,
	contractAddress: string,
	viemPublicClient: any,
	fromBlock: string,
): Promise<any | null> => {
	const logs = await viemPublicClient.getLogs({
		address: contractAddress,
		abi: ConceroAbi,
		fromBlock,
		toBlock: 'latest',
	})

	const filteredLog = logs.find((log: any) => {
		const decodedLog: any = decodeEventLog({
			abi: ConceroAbi,
			data: log.data,
			topics: log.topics,
		})

		const logId = eventName === 'CCIPSent' ? log.transactionHash : decodedLog.args.ccipMessageId
		return logId?.toLowerCase() === id.toLowerCase() && decodedLog.eventName === eventName
	})

	if (!filteredLog) {
		return null
	}

	return decodeEventLog({
		abi: ConceroAbi,
		data: filteredLog.data,
		topics: filteredLog.topics,
	})
}

async function checkTransactionStatus(
	txHash: string,
	srcPublicClient: PublicClient,
	swapDispatch: Dispatch<SwapAction>,
	swapState: SwapState,
): Promise<number | undefined> {
	const txStart = new Date().getTime()
	await srcPublicClient.waitForTransactionReceipt({
		hash: txHash as `0x${string}`,
	})

	const dstPublicClient = getPublicClient(config, { chainId: Number(swapState.to.chain.id) })

	const latestDstChainBlock = (await dstPublicClient.getBlockNumber()) - 100n
	const latestSrcChainBlock = (await srcPublicClient.getBlockNumber()) - 100n

	const txLog = await getLogByName(
		txHash,
		'CCIPSent',
		conceroAddressesMap[swapState.from.chain.id],
		srcPublicClient,
		'0x' + latestSrcChainBlock.toString(16),
	)

	const ccipMessageId = txLog.args.ccipMessageId

	let dstLog = null
	let srcFailLog = null

	while (dstLog === null && srcFailLog === null) {
		;[dstLog, srcFailLog] = await Promise.all([
			getLogByName(
				ccipMessageId,
				'UnconfirmedTXAdded',
				conceroAddressesMap[swapState.to.chain.id],
				dstPublicClient,
				'0x' + latestDstChainBlock.toString(16),
			),
			getLogByName(
				ccipMessageId,
				'FunctionsRequestError',
				conceroAddressesMap[swapState.from.chain.id],
				srcPublicClient,
				'0x' + latestSrcChainBlock.toString(16),
			),
		])

		await sleep(3000)
	}

	if (srcFailLog) {
		setError(swapDispatch, swapState, srcFailLog)
		return
	}

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

	let dstLog2 = null
	let dstFailLog = null

	while (dstLog2 === null && dstFailLog === null) {
		;[dstFailLog, dstLog2] = await Promise.all([
			getLogByName(
				ccipMessageId,
				'FunctionsRequestError',
				conceroAddressesMap[swapState.to.chain.id],
				dstPublicClient,
				'0x' + latestDstChainBlock.toString(16),
			),
			getLogByName(
				ccipMessageId,
				'TXReleased',
				conceroAddressesMap[swapState.to.chain.id],
				dstPublicClient,
				'0x' + latestDstChainBlock.toString(16),
			),
		])

		await sleep(3000)
	}

	if (dstFailLog) {
		setError(swapDispatch, swapState, dstFailLog)
		return
	}

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

	return txStart
}

export async function executeConceroRoute(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	switchChainHook: SwitchChainHookType,
): Promise<{ duration: number; hash: string } | undefined> {
	try {
		if (swapState.from.token.address === swapState.to.token.address) {
			swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
			swapDispatch({
				type: 'SET_SWAP_STEPS',
				payload: [{ title: 'Transaction failed', body: 'Tokens are the same', status: 'error' }],
			})
			return
		}

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

		await switchChainHook(Number(swapState.from.chain.id))

		const srcPublicClient = getPublicClient(config, { chainId: Number(swapState.from.chain.id) })
		const walletClient = await getWalletClient(config, { chainId: Number(swapState.from.chain.id) })

		await checkAllowanceAndApprove(swapState, srcPublicClient, walletClient)
		const tx = await sendTransaction(swapState, srcPublicClient, walletClient)

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ status: 'pending', title: 'Sending transaction' }],
		})

		const txStart = await checkTransactionStatus(tx, srcPublicClient, swapDispatch, swapState)

		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })

		void trackEvent({
			category: category.SwapCard,
			action: action.SwapSuccess,
			label: 'swap_success',
			data: { provider: 'concero', from: swapState.from, to: swapState.to },
		})

		if (!txStart) return

		return { duration: (new Date().getTime() - txStart) / 1000, hash: tx.hash }
	} catch (error) {
		console.error('Error executing concero route', error)
		setError(swapDispatch, swapState, error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
