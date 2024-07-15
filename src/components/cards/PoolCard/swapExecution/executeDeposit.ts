import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { type Dispatch } from 'react'
import {
	type Address,
	createPublicClient,
	createWalletClient,
	custom,
	decodeEventLog,
	type PublicClient,
	type WalletClient,
} from 'viem'
import { abi as ParentPool } from '../../../../abi/ParentPool.json'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { baseSepolia } from 'wagmi/chains'
import { http } from 'wagmi'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'
import { config } from '../../../../constants/config'

export const parentPoolAddress = config.PARENT_POOL_CONTRACT

async function sendTransaction(swapState: SwapState, srcPublicClient: PublicClient, walletClient: WalletClient) {
	const depositAmount = BigInt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals)!)

	return await walletClient.writeContract({
		account: swapState.from.address,
		abi: ParentPool,
		functionName: 'depositLiquidity',
		address: parentPoolAddress,
		args: [depositAmount],
		gas: 4_000_000n,
	})
}

const checkTransactionStatus = async (
	publicClient: PublicClient,
	swapDispatch: Dispatch<SwapAction>,
	swapState: SwapState,
) => {
	const timer = setInterval(async () => {
		const logs = await publicClient.getLogs({
			address: parentPoolAddress,
			args: {
				from: swapState.from.address,
				to: parentPoolAddress,
			},
		})

		console.log('fetched logs', logs.length)

		for (const log of logs) {
			const decodedLog = decodeEventLog({
				abi: ParentPool,
				data: log.data,
				topics: log.topics,
			})

			console.log(decodedLog.eventName)

			if (decodedLog.eventName === 'ParentPool_SuccessfulDeposited') {
				swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
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

				clearTimeout(timer)
			}
		}
	}, 3000)

	setTimeout(() => {
		clearTimeout(timer)
	}, 60_000)
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

export async function executeDeposit(
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

		const publicClient = createPublicClient({
			chain: baseSepolia, // TODO change mainnet
			transport: http(),
		})

		const walletClient = createWalletClient({
			chain: baseSepolia,
			transport: custom(window && window.ethereum!),
		})

		await walletClient.switchChain({ id: baseSepolia.id })

		await checkTransactionStatus(publicClient, swapDispatch, swapState)

		await checkAllowanceAndApprove(swapState, publicClient, walletClient)

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ status: 'pending', title: 'Sending transaction' }],
		})

		const hash = await sendTransaction(swapState, publicClient, walletClient)

		console.log('txHash', hash)
	} catch (error) {
		setError(swapDispatch, swapState, error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
