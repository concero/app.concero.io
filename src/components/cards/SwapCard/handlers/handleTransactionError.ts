import { Dispatch } from 'react'
import { SwapAction, SwapCardStage } from '../swapReducer/types'
import { StandardRoute } from '../../../../types/StandardRoute'
import { logTxToDB } from '../../../../utils/logTxToDB'

export const handleTransactionError = (e: Error, swapDispatch: Dispatch<SwapAction>, selectedRoute: StandardRoute) => {
	swapDispatch({ type: 'UPDATE_LAST_SWAP_STEP' })
	if (e.toString().toLowerCase().includes('user rejected')) {
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Cancelled by user', body: 'Transaction was cancelled', status: 'error' },
		})
	} else if (e.toString().toLowerCase().includes('insufficient')) {
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Insufficient balance', body: 'Please check your balance and try again', status: 'error' },
		})
	} else {
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Transaction failed', body: 'Something went wrong', status: 'error' },
		})
	}

	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	logTxToDB({ tx_id: selectedRoute.id, status: 'failure', provider: selectedRoute.provider, tx_data: selectedRoute })
}
