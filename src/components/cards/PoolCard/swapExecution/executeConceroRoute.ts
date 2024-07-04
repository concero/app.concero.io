import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { type Dispatch } from 'react'
import { type Address, decodeEventLog, erc20Abi, type WalletClient } from 'viem'
import { getPublicClient, getWalletClient, switchChain } from '@wagmi/core'
import { abi as ParentPool } from '../../../../abi/ParentPool.json'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { writeContract } from 'viem/actions'
import { config } from '../../../../web3/wagmi'
import { type PublicClient } from 'viem/clients/createPublicClient'

export const conceroAddressesMap: Record<string, `0x${string}`> = {
	'84532': '0xf077340a0f8937682627c8005e34d4818e2aa799', // base
}

const sleep = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

async function checkAllowanceAndApprove(
	swapState: SwapState,
	srcPublicClient: PublicClient,
	walletClient: WalletClient,
) {
	const bnmAllowance = await srcPublicClient.readContract({
		abi: erc20Abi,
		functionName: 'allowance',
		address: swapState.from.token.address as `0x${string}`,
		args: [swapState.from.address as `0x${string}`, conceroAddressesMap[swapState.from.chain.id]],
	})

	let bnmApproveTxHash = null

	if (bnmAllowance < BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!)) {
		bnmApproveTxHash = await writeContract(walletClient, {
			abi: erc20Abi,
			functionName: 'approve',
			address: swapState.from.token.address as `0x${string}`,
			args: [conceroAddressesMap[swapState.from.chain.id], 2n],
		})
	}

	if (bnmApproveTxHash) {
		await srcPublicClient.waitForTransactionReceipt({ hash: bnmApproveTxHash })
	}
}

async function sendTransaction(swapState: SwapState, srcPublicClient: PublicClient, walletClient: WalletClient) {
	const gasPrice = await srcPublicClient.getGasPrice()

	const depositData = BigInt(swapState.from.amount)

	return await writeContract(walletClient, {
		abi: ParentPool,
		functionName: 'depositLiquidity',
		address: swapState.to.address as Address,
		args: [depositData],
		gasPrice,
		gas: 234422n,
	})
}

const setError = (swapDispatch: Dispatch<SwapAction>, swapState: SwapState, error: any) => {
	console.error('Error executing concero route', error)

	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
	})

	if (error?.message?.toLowerCase().includes('user rejected')) {
		return
	}

	let type: string = 'frontend'

	if (error.status === 'reverted' || error.eventName === 'FunctionsRequestError') {
		type = 'infrastructure'
	}

	void trackEvent({
		category: category.SwapCard,
		action: action.SwapFailed,
		label: 'swap_failed',
		data: { provider: 'concero', from: swapState.from, to: swapState.to, error, type },
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
		abi: ParentPool,
		fromBlock,
		toBlock: 'latest',
	})

	const filteredLog = logs.find((log: any) => {
		const decodedLog: any = decodeEventLog({
			abi: ParentPool,
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
		abi: ParentPool,
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
	const tx = await srcPublicClient.waitForTransactionReceipt({
		hash: txHash as `0x${string}`,
	})

	if (tx.status === 'reverted') {
		setError(swapDispatch, swapState, tx)
		return
	}

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
): Promise<{ duration: number; hash: string } | undefined> {
	try {
		// if (swapState.to.amount === '0' || swapState.to.amount === '') {
		// 	return
		// }

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

		await switchChain(config, { chainId: Number(swapState.from.chain.id) })

		const srcPublicClient = getPublicClient(config, { chainId: Number(swapState.from.chain.id) })
		const walletClient = await getWalletClient(config, { chainId: Number(swapState.from.chain.id) })

		await checkAllowanceAndApprove(swapState, srcPublicClient, walletClient)

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ status: 'pending', title: 'Sending transaction' }],
		})

		const hash = await sendTransaction(swapState, srcPublicClient, walletClient)

		console.log('txHash', hash, swapState)

		// const txStart = await checkTransactionStatus(hash, srcPublicClient, swapDispatch, swapState)
		const txStart = true

		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })

		void trackEvent({
			category: category.SwapCard,
			action: action.SwapSuccess,
			label: 'swap_success',
			data: { provider: 'concero', from: swapState.from, to: swapState.to },
		})

		if (!txStart) return

		return { duration: (new Date().getTime() - txStart) / 1000, hash }
	} catch (error) {
		setError(swapDispatch, swapState, error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
