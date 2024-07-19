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
} from 'viem'
import { abi as ParentPool } from '../../../../abi/ParentPool.json'
import { baseSepolia } from 'wagmi/chains'
import { http } from 'wagmi'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'

// export const parentPoolAddress = config.PARENT_POOL_CONTRACT
export const parentPoolAddress = '0x42b40f42f28178998b2a4A8e5fe725F65403Ed24' // TODO change to mainnet
const chain = baseSepolia

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

			console.log(decodedLog.eventName)

			if (decodedLog.eventName === 'ParentPool_SuccessfulDeposited') {
				swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
				swapDispatch({
					type: 'SET_SWAP_STEPS',
					payload: [{ status: 'success', title: 'Sending transaction' }],
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
			chain,
			transport: http(),
		})

		const walletClient = createWalletClient({
			chain,
			transport: custom(window && window.ethereum!),
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
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
		})
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
