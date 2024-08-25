import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { type Dispatch } from 'react'
import {
	type Address,
	createPublicClient,
	decodeEventLog,
	type Hash,
	http,
	type PublicClient,
	type WalletClient,
} from 'viem'
import { abi as ParentPool } from '../../../../abi/ParentPool.json'
import { base } from 'viem/chains'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'
import { config } from '../../../../constants/config'
import { TransactionStatus } from '../../../../api/concero/types'

export enum WithdrawStatus {
	completeWithdrawal = 'completeWithdrawal',
	startWithdraw = 'startWithdraw',
}

export const parentPoolAddress = config.PARENT_POOL_CONTRACT
const chain = base

const publicClient = createPublicClient({
	chain,
	transport: http(),
})

async function sendTransaction(swapState: SwapState, srcPublicClient: PublicClient, walletClient: WalletClient) {
	const depositAmount = BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!)

	return await walletClient.writeContract({
		account: swapState.from.address,
		abi: ParentPool,
		functionName: 'startWithdrawal',
		address: parentPoolAddress,
		args: [depositAmount],
		gas: 4_000_000n,
	})
}

const checkTransactionStatus = async (txHash: Hash, publicClient: PublicClient, swapDispatch: Dispatch<SwapAction>) => {
	const receipt = await publicClient.waitForTransactionReceipt({
		hash: txHash,
		timeout: 300_000,
		pollingInterval: 3_000,
		retryCount: 30,
		confirmations: 5,
	})

	if (receipt.status === 'reverted') {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
		})
	}

	for (const log of receipt.logs) {
		try {
			const decodedLog = decodeEventLog({
				abi: ParentPool,
				data: log.data,
				topics: log.topics,
				strict: false,
			})

			if (decodedLog.eventName === 'ConceroParentPool_WithdrawRequestInitiated') {
				swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
				swapDispatch({
					type: 'SET_SWAP_STEPS',
					payload: [{ status: 'success', title: 'Sending transaction' }],
				})
			}
		} catch (err) {}
	}
}

export async function startWithdrawal(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	walletClient: WalletClient,
): Promise<{ duration: number; hash: string } | undefined> {
	try {
		if (swapState.to.amount === '0' || swapState.to.amount === '') {
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

		await walletClient.switchChain({ id: chain.id })

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ status: 'pending', title: 'Sending transaction' }],
		})

		await checkAllowanceAndApprove(swapState, publicClient, walletClient)
		const hash = await sendTransaction(swapState, publicClient, walletClient)

		await checkTransactionStatus(hash, publicClient, swapDispatch)
	} catch (error) {
		console.error(error)
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
		})
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}

export const completeWithdrawal = async (address: Address, walletClient: WalletClient): Promise<TransactionStatus> => {
	const hash = await walletClient.writeContract({
		account: address,
		abi: ParentPool,
		functionName: 'completeWithdrawal',
		args: [],
		address: parentPoolAddress,
		gas: 4_000_000n,
	})

	const receipt = await publicClient.waitForTransactionReceipt({
		hash,
		timeout: 300_000,
		pollingInterval: 3_000,
		retryCount: 30,
		confirmations: 5,
	})

	if (receipt.status === 'reverted') {
		return TransactionStatus.FAILED
	}

	for (const log of receipt.logs) {
		try {
			const decodedLog = decodeEventLog({
				abi: ParentPool,
				data: log.data,
				topics: log.topics,
			})

			if (decodedLog.eventName === 'ConceroParentPool_Withdrawn') {
				return TransactionStatus.SUCCESS
			}
			if (decodedLog.eventName === 'ConceroParentPool_CLFRequestError') {
				return TransactionStatus.FAILED
			}
		} catch (err) {
			console.error(err)
			return TransactionStatus.FAILED
		}
	}

	return TransactionStatus.FAILED
}
