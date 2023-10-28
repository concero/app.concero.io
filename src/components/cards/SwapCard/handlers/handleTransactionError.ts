import { Dispatch } from 'react'
import { SwapAction, SwapActionType } from '../swapReducer/types'
import { ButtonType } from '../../../buttons/SwapButton/constants'

export const handleTransactionError = (e: Error, swapDispatch: Dispatch<SwapAction>, provider: 'rango' | 'lifi') => {
	swapDispatch({ type: 'UPDATE_LAST_SWAP_STEP' })
	if (e.toString().toLowerCase().includes('user rejected')) {
		swapDispatch({ type: SwapActionType.SET_BUTTON_STATE, buttonType: ButtonType.CANCELED })
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Cancelled by user', body: 'Transaction was cancelled', status: 'error' },
		})
	} else if (e.toString().toLowerCase().includes('insufficient')) {
		swapDispatch({ type: SwapActionType.SET_BUTTON_STATE, buttonType: ButtonType.LOW_BALANCE })
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Insufficient balance', body: 'Please check your balance and try again', status: 'error' },
		})
	} else {
		swapDispatch({ type: SwapActionType.SET_BUTTON_STATE, buttonType: ButtonType.SOMETHING_WENT_WRONG })
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Transaction failed', body: 'Something went wrong', status: 'error' },
		})
	}

	swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'failure' })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'failed' })
}
