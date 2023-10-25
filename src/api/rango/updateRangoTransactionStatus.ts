import { TransactionStatus } from 'rango-sdk'
import { TransactionStatusResponse } from 'rango-sdk/src/types'
import { Dispatch } from 'react'
import { SwapAction, SwapState } from '../../components/cards/SwapCard/swapReducer/types'
import { Step } from '../lifi/types'

function updatePrevStatuses(swapDispatch: Dispatch<SwapAction>, swapState: SwapState) {
	const { steps } = swapState

	const newStatuses = steps.map((step: Step) => {
		return { ...step, status: 'success' }
	})

	console.log('newStatuses', newStatuses)

	swapDispatch({ type: 'UPSERT_SWAP_STEP', payload: newStatuses })
}

export function updateRangoTransactionStatus(txStatus: TransactionStatusResponse, swapDispatch: Dispatch<SwapAction>, swapState: SwapState) {
	const txLink = txStatus.explorerUrl[0]?.url ?? null
	const { status } = txStatus

	switch (status) {
		case TransactionStatus.FAILED: {
			updatePrevStatuses(swapDispatch, swapState)
			swapDispatch({
				type: 'APPEND_SWAP_STEP',
				payload: {
					status: 'error',
					title: 'Transaction failed',
					body: 'Please look up the transaction in the explorer to find out the details.',
					txLink,
				},
			})
			return
		}
		case TransactionStatus.SUCCESS: {
			let body = 'Your transaction was successful.'
			updatePrevStatuses(swapDispatch, swapState)
			swapDispatch({
				type: 'APPEND_SWAP_STEP',
				payload: { status: 'success', title: 'Swap completed', body, txLink },
			})
			return
		}
		case TransactionStatus.RUNNING: {
			const body = 'Please wait, this may take up to 20 minutes.'
			swapDispatch({
				type: 'UPSERT_SWAP_STEP',
				payload: { status: 'pending', title: 'Transaction pending', body, txLink },
			})
			return
		}
		default:
			swapDispatch({
				type: 'APPEND_SWAP_STEP',
				payload: { status: 'await', title: 'Transaction in progress', body: 'Please be patient, this may take up to 20 minutes.', txLink },
			})
	}
}
