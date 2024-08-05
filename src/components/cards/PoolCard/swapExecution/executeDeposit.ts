import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { type Dispatch } from 'react'
import { decodeEventLog, type Hash, parseUnits, type PublicClient, type WalletClient } from 'viem'
import { base } from 'viem/chains'
import { abi as ParentPool } from '../../../../abi/ParentPool.json'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'
import { config } from '../../../../constants/config'
import { sleep } from '../../../../utils/sleep'
import { getPublicClient } from '@wagmi/core'
import { config as wagmiConfig } from '../../../../web3/wagmi'

export const parentPoolAddress = config.PARENT_POOL_CONTRACT
const chain = base

const completeDeposit = async (
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	depositRequestId: string,
	walletClient: WalletClient,
	publicClient: PublicClient,
) => {
	console.log('requestID', depositRequestId)

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
		throw new Error('Transaction reverted')
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
	walletClient: WalletClient,
	swapDispatch: Dispatch<SwapAction>,
	swapState: SwapState,
) => {
	const receipt = await publicClient.waitForTransactionReceipt({
		hash: txHash,
		confirmations: 5,
	})

	console.log(receipt)

	if (receipt.status === 'reverted') {
		throw new Error('Transaction reverted')
	}

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
		throw new Error('Deposit initiation log not found')
	}

	const decodedLog = decodeEventLog({
		abi: ParentPool,
		data: depositInitiatedLog.data,
		topics: depositInitiatedLog.topics,
	})

	console.log(decodedLog)

	const depositRequestId = decodedLog.args.requestId

	await sleep(50_000)

	await completeDeposit(swapState, swapDispatch, depositRequestId, walletClient, publicClient)
}

export async function executeDeposit(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	walletClient: WalletClient,
): Promise<{ duration: number; hash: string } | undefined> {
	try {
		if (swapState.to.amount === '0' || swapState.to.amount === '') {
			return
		}

		const publicClient = getPublicClient(wagmiConfig, { chainId: Number(swapState.from.chain.id) })

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

		const hash = await walletClient.writeContract({
			abi: ParentPool,
			functionName: 'startDeposit',
			address: parentPoolAddress,
			args: [parseUnits(swapState.from.amount, swapState.from.token.decimals)],
			gas: 2_000_000n,
		})

		await handleDepositTransaction(hash, publicClient, walletClient, swapDispatch, swapState)
	} catch (error) {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
		})
		console.error(error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
