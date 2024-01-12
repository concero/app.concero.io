import { type Dispatch } from 'react'
import { type SwapAction, SwapCardStage } from '../swapReducer/types'
import { type StandardRoute } from '../../../../types/StandardRoute'
import { logTxToDB } from '../../../../utils/logTxToDB'
import { action, category } from '../../../../constants/tracking'
import { trackEvent } from '../../../../hooks/useTracking'

export const handleTransactionError = (e: Error, swapDispatch: Dispatch<SwapAction>, selectedRoute: StandardRoute) => {
	swapDispatch({ type: 'UPDATE_LAST_SWAP_STEP' })
	selectedRoute.error = e.toString()

	if (e.toString().toLowerCase().includes('user rejected')) {
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Cancelled by user', body: 'Transaction was cancelled', status: 'error' },
		})

		trackEvent({
			category: category.SwapCard,
			action: action.SwapRejected,
			label: 'User rejected swap',
			data: { stdRoute: selectedRoute },
		})
	} else if (e.toString().toLowerCase().includes('insufficient')) {
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Insufficient balance', body: 'Please check your balance and try again', status: 'error' },
		})
		trackEvent({ category: category.SwapCard, action: action.SwapFailed, label: 'swap_failed', data: { provider: selectedRoute.provider, selectedRoute } })
		logTxToDB({ tx_id: selectedRoute.id, status: 'failure', provider: selectedRoute.provider, tx_data: selectedRoute })
	} else {
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Transaction failed', body: 'Something went wrong', status: 'error' },
		})
		trackEvent({ category: category.SwapCard, action: action.SwapFailed, label: 'swap_failed', data: { provider: selectedRoute.provider, selectedRoute } })
		logTxToDB({ tx_id: selectedRoute.id, status: 'failure', provider: selectedRoute.provider, tx_data: selectedRoute })
	}

	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
}
