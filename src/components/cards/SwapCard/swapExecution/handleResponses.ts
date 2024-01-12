import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { TransactionStatus } from 'rango-types/src/api/shared/transactions'
import { type SwapAction, SwapCardStage } from '../swapReducer/types'
import { type Dispatch } from 'react'
import { logTxToDB } from '../../../../utils/logTxToDB'
import { action, category } from '../../../../constants/tracking'
import { trackEvent } from '../../../../hooks/useTracking'
import { type Route } from '@lifi/types'
import { type TransactionStatusResponse } from 'rango-sdk/src/types'
import { type StandardRoute } from '../../../../types/StandardRoute'

export const handleRangoResponse = (executedRoute: TransactionStatusResponse, swapDispatch: Dispatch<SwapAction>, stdRoute: StandardRoute) => {
	swapDispatch({ type: 'UPDATE_LAST_SWAP_STEP' })
	stdRoute.executedRoute = executedRoute

	if (executedRoute.status === TransactionStatus.FAILED) {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		logTxToDB({ tx_id: executedRoute.diagnosisUrl, status: 'failure', provider: 'rango', tx_data: stdRoute })
		trackEvent({ category: category.SwapCard, action: action.SwapFailed, label: 'swap_failed', data: { provider: 'rango', stdRoute } })
	} else if (executedRoute.status === TransactionStatus.SUCCESS) {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
		logTxToDB({ tx_id: executedRoute.diagnosisUrl, status: 'success', provider: 'rango', tx_data: stdRoute })
		trackEvent({ category: category.SwapCard, action: action.SwapSuccess, label: 'swap_success', data: { provider: 'rango', stdRoute } })
	}
}

export const handleLifiResponse = (executedRoute: Route, swapDispatch: Dispatch<SwapAction>) => {
	const stdRoute = standardiseLifiRoute(executedRoute)
	const lastExecutionStep = stdRoute.execution[stdRoute.execution.length - 1]
	swapDispatch({ type: 'UPDATE_LAST_SWAP_STEP' })

	if (lastExecutionStep?.status.toLowerCase() === 'done') {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
		logTxToDB({ tx_id: executedRoute.id, status: 'success', provider: 'lifi', tx_data: stdRoute })
		trackEvent({ category: category.SwapCard, action: action.SwapSuccess, label: 'swap_success', data: { provider: 'lifi', stdRoute } })
	} else if (lastExecutionStep?.status.toLowerCase() === 'failed') {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		logTxToDB({ tx_id: executedRoute.id, status: 'failure', provider: 'lifi', tx_data: stdRoute })
		trackEvent({ category: category.SwapCard, action: action.SwapFailed, label: 'swap_failed', data: { provider: 'lifi', stdRoute } })
	} else if (lastExecutionStep?.status.toLowerCase() === 'cancelled') {
		logTxToDB({ tx_id: executedRoute.id, status: 'cancelled', provider: 'lifi', tx_data: stdRoute })

		trackEvent({
			category: category.SwapCard,
			action: action.SwapRejected,
			label: 'User rejected swap',
			data: { stdRoute },
		})
	}
}
