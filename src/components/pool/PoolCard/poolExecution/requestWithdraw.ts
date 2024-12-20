import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { type Dispatch } from 'react'
import { type Address, decodeEventLog, type Hash, parseAbi, type PublicClient, type WalletClient } from 'viem'
import { base } from 'viem/chains'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'
import { config, IS_TESTNET, PARENT_POOL_CHAIN_ID } from '../../../../constants/config'
import { TransactionStatus } from '../../../../api/concero/types'
import { getPublicClient, getWalletClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../../../utils/web3/wagmi'
import { baseSepolia } from 'wagmi/chains'
import { trackEvent } from '../../../../hooks/useTracking'
import { action as trackingAction, category } from '../../../../constants/tracking'
import ParentPoolAbiV1_5 from '../../../../constants/abi/ParentPoolAbiV1_5'
import { decodeEventLogWrapper } from '../../../../utils/decodeEventLogWrapper'

export const parentPoolAddress = config.PARENT_POOL_CONTRACT
const chain = IS_TESTNET ? baseSepolia : base

const publicClient = getPublicClient(wagmiConfig, { chainId: chain.id })

async function sendTransaction(swapState: SwapState, srcPublicClient: PublicClient, walletClient: WalletClient) {
	const depositAmount = BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!)

	return await walletClient.writeContract({
		account: swapState.from.address,
		abi: ParentPoolAbiV1_5,
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

		void trackEvent({
			category: category.PoolCard,
			action: trackingAction.FailedWithdrawalRequest,
			label: trackingAction.FailedWithdrawalRequest,
			data: { txHash },
		})
	}

	for (const log of receipt.logs) {
		try {
			const decodedLog = decodeEventLog({
				abi: ParentPoolAbiV1_5,
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

				void trackEvent({
					category: category.PoolCard,
					action: trackingAction.SuccessWithdrawalRequest,
					label: 'action_success_withdraw_request',
					data: { txHash },
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

		await checkAllowanceAndApprove(swapState, swapDispatch, publicClient, walletClient)
		const hash = await sendTransaction(swapState, publicClient, walletClient)

		await checkTransactionStatus(hash, publicClient, swapDispatch)
	} catch (error) {
		console.error(error)
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
		})
		void trackEvent({
			category: category.PoolCard,
			action: trackingAction.FailedWithdrawalRequest,
			label: 'action_failed_withdraw_request',
			data: { from: swapState.from, to: swapState.to },
		})
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}

const getCompleteWithdrawalFailedTrackEvent = (hash: Hash) => {
	void trackEvent({
		category: category.PoolUserActions,
		action: trackingAction.FailedWithdrawalComplete,
		label: trackingAction.FailedWithdrawalComplete,
		data: { txHash: hash },
	})
}

export const completeWithdrawal = async (address: Address, chainId: number): Promise<TransactionStatus> => {
	const walletClient = await getWalletClient(wagmiConfig, { chainId })
	walletClient.switchChain({ id: PARENT_POOL_CHAIN_ID })

	const hash = await walletClient.writeContract({
		account: address,
		abi: ParentPoolAbiV1_5,
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
		getCompleteWithdrawalFailedTrackEvent(hash)

		return TransactionStatus.FAILED
	}

	for (const log of receipt.logs) {
		try {
			const decodedLog = decodeEventLogWrapper({
				abi: ParentPoolAbiV1_5,
				log,
			})

			if (decodedLog.eventName === 'ConceroParentPool_Withdrawn') {
				void trackEvent({
					category: category.PoolUserActions,
					action: trackingAction.SuccessWithdrawalComplete,
					label: trackingAction.SuccessWithdrawalComplete,
					data: { txHash: hash },
				})

				return TransactionStatus.SUCCESS
			}
			if (decodedLog.eventName === 'ConceroParentPool_CLFRequestError') {
				getCompleteWithdrawalFailedTrackEvent(hash)

				return TransactionStatus.FAILED
			}
		} catch (err) {}
	}

	getCompleteWithdrawalFailedTrackEvent(hash)
	return TransactionStatus.FAILED
}

export const retryWithdrawal = async (address: Address, chainId: number): Promise<TransactionStatus> => {
	const walletClient = await getWalletClient(wagmiConfig, { chainId })
	walletClient.switchChain({ id: PARENT_POOL_CHAIN_ID })

	// const withdrawId = await getWithdrawalIdByLpAddress(address)
	// if (!withdrawId) return TransactionStatus.FAILED

	const hash = await walletClient.writeContract({
		account: address,
		abi: parseAbi(['function retryPerformWithdrawalRequest() external']),
		functionName: 'retryPerformWithdrawalRequest',
		address: parentPoolAddress,
		gas: 4_000_000n,
	})

	const receipt = await publicClient.waitForTransactionReceipt({
		hash,
		timeout: 60_000,
		pollingInterval: 3_000,
		retryCount: 50,
		confirmations: 5,
	})

	if (receipt.status === 'reverted') {
		void trackEvent({
			category: category.PoolUserActions,
			action: trackingAction.FailedRetryWithdrawalRequest,
			label: trackingAction.FailedRetryWithdrawalRequest,
			data: { txHash: hash },
		})
		return TransactionStatus.FAILED
	}

	for (const log of receipt.logs) {
		try {
			const decodedLog = decodeEventLogWrapper({
				abi: ParentPoolAbiV1_5,
				log,
			})

			if (decodedLog.eventName === 'ConceroAutomation_RetryPerformed') {
				void trackEvent({
					category: category.PoolUserActions,
					action: trackingAction.SuccessRetryWithdrawalRequest,
					label: trackingAction.SuccessRetryWithdrawalRequest,
					data: { txHash: hash },
				})
				return TransactionStatus.SUCCESS
			}
		} catch (err) {
			console.error(err)
		}
	}

	void trackEvent({
		category: category.PoolUserActions,
		action: trackingAction.FailedRetryWithdrawalRequest,
		label: trackingAction.FailedRetryWithdrawalRequest,
		data: { txHash: hash },
	})
	return TransactionStatus.FAILED
}
