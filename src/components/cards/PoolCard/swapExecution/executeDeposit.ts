import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { type Dispatch } from 'react'
import {
	createPublicClient,
	createWalletClient,
	custom,
	decodeEventLog,
	type Hash,
	type PublicClient,
	type WalletClient,
	http,
} from 'viem'
import { base } from 'viem/chains'
import { abi as ParentPool } from '../../../../abi/ParentPool.json'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'
import { config } from '../../../../constants/config'

export const parentPoolAddress = config.PARENT_POOL_CONTRACT
const chain = base

const publicClient = createPublicClient({
	chain,
	transport: http(),
})

const walletClient = createWalletClient({
	chain,
	transport: custom(window && window.ethereum!),
})

async function requestDeposit(swapState: SwapState, srcPublicClient: PublicClient, walletClient: WalletClient) {
	const depositAmount = BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!)

	return await walletClient.writeContract({
		account: swapState.from.address,
		abi: ParentPool,
		functionName: 'startDeposit',
		address: parentPoolAddress,
		args: [depositAmount],
		gas: 4_000_000n,
	})
}

const completeDeposit = async (swapState: SwapState, depositRequestId: string) => {
	return await walletClient.writeContract({
		account: swapState.from.address,
		abi: ParentPool,
		functionName: 'completeDeposit',
		address: parentPoolAddress,
		args: [depositRequestId],
		gas: 4_000_000n,
	})
}

const checkDepositStatus = async (txHash: Hash, publicClient: PublicClient, swapDispatch: Dispatch<SwapAction>) => {
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
			})

			if (decodedLog.eventName === 'ConceroParentPool_DepositCompleted') {
				swapDispatch({
					type: 'SET_SWAP_STEPS',
					payload: [
						{ status: 'success', title: 'Sending transaction' },
						{
							status: 'success',
							title: 'Complete',
						},
					],
				})
			}
		} catch (err) {}
	}
}

const handleDepositTransaction = async (
	txHash: Hash,
	publicClient: PublicClient,
	swapDispatch: Dispatch<SwapAction>,
	swapState: SwapState,
) => {
	const receipt = await publicClient.waitForTransactionReceipt({
		hash: txHash,
		timeout: 300_000,
		pollingInterval: 3_000,
		retryCount: 30,
		confirmations: 3,
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
			})

			if (decodedLog.eventName === 'ConceroParentPool_DepositInitiated') {
				return await completeDeposit(swapState, decodedLog.args.requestId)
			}

			if (decodedLog.eventName === 'ConceroParentPool_CLFRequestError') {
				swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
				swapDispatch({
					type: 'SET_SWAP_STEPS',
					payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
				})
			}
		} catch (err) {}
	}
}

export async function executeDeposit(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
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
		const hash = await requestDeposit(swapState, publicClient, walletClient)

		const depositTxHash = await handleDepositTransaction(hash, publicClient, swapDispatch, swapState)
		await checkDepositStatus(depositTxHash, publicClient, swapDispatch)
	} catch (error) {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
		})
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
