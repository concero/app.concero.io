import { TransactionStatus } from 'rango-sdk'
import { TransactionStatusResponse } from 'rango-sdk/src/types'
import { Dispatch } from 'react'
import { SwapAction } from '../../components/cards/SwapCard/swapReducer/types'

export function updateRangoTransactionStatus(txStatus: TransactionStatusResponse, swapDispatch: Dispatch<SwapAction>) {
	const txLink = txStatus.explorerUrl[0]?.url ?? null
	const { status } = txStatus

	swapDispatch({ type: 'UPDATE_PREV_RANGO_STEPS', currentTransactionStatus: status as TransactionStatus })

	switch (status) {
		case TransactionStatus.FAILED: {
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
				payload: { status: 'pending', title: 'Bridging transaction', body, txLink },
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