import { StageType, type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { type Dispatch } from 'react'
import { type Address, decodeEventLog, type Hash, parseUnits, type PublicClient, type WalletClient } from 'viem'
import { base } from 'viem/chains'
import { abi as ParentPool } from '../../../../abi/ParentPool.json'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'
import { config, IS_TESTNET } from '../../../../constants/config'
import { sleep } from '../../../../utils/sleep'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../../../web3/wagmi'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { baseSepolia } from 'wagmi/chains'

export const parentPoolAddress = config.PARENT_POOL_CONTRACT
const chain = IS_TESTNET ? baseSepolia : base

interface CustomError {
	data: {
		txHash: string
	}
}

const throwError = (txHash: Address) => {
	const error = new Error('Failed transaction')
	error.data = { txHash }

	throw error
}

const completeDeposit = async (
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	depositRequestId: string,
	walletClient: WalletClient,
	publicClient: PublicClient,
) => {
	const txHash = await walletClient.writeContract({
		abi: ParentPool,
		functionName: 'completeDeposit',
		address: parentPoolAddress,
		args: [depositRequestId],
		gas: 4_000_000n,
	})

	const receipt = await publicClient.waitForTransactionReceipt({
		hash: txHash,
		confirmations: 5,
	})

	if (receipt.status === 'reverted') {
		throwError(txHash)
	}

	for (const log of receipt.logs) {
		try {
			const decodedLog = decodeEventLog({
				abi: ParentPool,
				data: log.data,
				topics: log.topics,
			})

			if (decodedLog.eventName === 'ConceroParentPool_DepositCompleted') {
				await trackEvent({
					category: category.PoolCard,
					action: action.SuccessDeposit,
					label: action.SuccessDeposit,
					data: { from: swapState.from, to: swapState.to, txHash },
				})

				swapDispatch({
					type: 'SET_SWAP_STEPS',
					payload: [
						{ title: 'Signature required', status: 'success', type: StageType.approve },
						{ title: 'Pending', status: 'success', type: StageType.requestTx },
						{ title: 'Pending', status: 'success', type: StageType.transaction },
					],
				})

				return
			}
		} catch (err) {}
	}
	throwError(txHash)
}

const handleDepositTransaction = async (
	txHash: Hash,
	publicClient: PublicClient,
	walletClient: WalletClient,
	swapDispatch: Dispatch<SwapAction>,
	swapState: SwapState,
) => {
	const receipt = await publicClient.waitForTransactionReceipt({
		hash: txHash,
		confirmations: 5,
	})

	if (receipt.status === 'reverted') {
		throwError(txHash)
	}

	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [
			{ title: 'Signature required', status: 'success', type: StageType.approve },
			{ title: 'Pending', status: 'success', type: StageType.requestTx },
			{ title: 'Pending', status: 'pending', type: StageType.transaction },
		],
	})

	const depositInitiatedLog = receipt.logs.find(log => {
		try {
			if (!log.topics.length) return false

			const decodedLog = decodeEventLog({
				abi: ParentPool,
				data: log.data,
				topics: log.topics,
			})

			return decodedLog.eventName === 'ConceroParentPool_DepositInitiated'
		} catch (error) {
			return false
		}
	})

	if (!depositInitiatedLog) {
		throwError(txHash)
	}

	const decodedLog = decodeEventLog({
		abi: ParentPool,
		data: depositInitiatedLog.data,
		topics: depositInitiatedLog.topics,
	})

	const depositRequestId = decodedLog.args.requestId
	await sleep(25_000)

	await completeDeposit(swapState, swapDispatch, depositRequestId, walletClient, publicClient)
}

export async function executeDeposit(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	walletClient: WalletClient,
): Promise<{ duration: number; hash: string } | undefined> {
	try {
		void trackEvent({
			category: category.PoolCard,
			action: action.BeginDeposit,
			label: 'concero_begin_deposit',
			data: { from: swapState.from, to: swapState.to },
		})

		if (swapState.to.amount === '0' || swapState.to.amount === '') {
			return
		}

		const publicClient = getPublicClient(wagmiConfig, { chainId: Number(swapState.from.chain.id) })

		swapDispatch({ type: 'SET_LOADING', payload: true })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.progress })

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Signature required', status: 'await', type: StageType.approve }],
		})

		await walletClient.switchChain({ id: chain.id })

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [
				{
					title: 'Signature required',
					status: 'await',
					type: StageType.approve,
					body: 'Please open your wallet and sign the transaction',
				},
			],
		})

		await checkAllowanceAndApprove(swapState, swapDispatch, publicClient, walletClient)

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [
				{ title: 'Signature required', status: 'success', type: StageType.approve },
				{ title: 'transaction confirmation', status: 'await', type: StageType.requestTx },
			],
		})

		const hash = await walletClient.writeContract({
			abi: ParentPool,
			functionName: 'startDeposit',
			address: parentPoolAddress,
			args: [parseUnits(swapState.from.amount, swapState.from.token.decimals)],
			gas: 2_000_000n,
		})

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [
				{ title: 'Signature required', status: 'success', type: StageType.approve },
				{ title: 'Pending', status: 'pending', type: StageType.requestTx },
			],
		})

		await handleDepositTransaction(hash, publicClient, walletClient, swapDispatch, swapState)
	} catch (e) {
		const error = e as CustomError

		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [
				{
					title: 'Transaction failed',
					body: 'Something went wrong',
					status: 'error',
					type: StageType.transaction,
				},
			],
		})

		await trackEvent({
			category: category.PoolCard,
			action: action.FailedDeposit,
			label: 'concero_failed_deposit',
			data: { from: swapState.from, to: swapState.to, txHash: error.data.txHash },
		})
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
