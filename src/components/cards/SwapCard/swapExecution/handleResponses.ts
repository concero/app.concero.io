import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { TransactionStatus } from 'rango-types/src/api/shared/transactions'

export const handleRangoResponse = (executedRoute, swapDispatch, provider) => {
	if (executedRoute.status === TransactionStatus.FAILED) {
		swapDispatch({ type: 'SET_RESPONSE', payload: { provider, isOk: false, message: executedRoute.error } })
	} else if (executedRoute.status === 'success') {
		swapDispatch({ type: 'SET_RESPONSE', payload: { provider, isOk: true, message: 'Success' } })
	}
}

export const handleLifiResponse = (executedRoute, swapDispatch, provider) => {
	const stdRoute = standardiseLifiRoute(executedRoute)
	const lastExecutionStep = stdRoute.execution[stdRoute.execution.length - 1]

	if (lastExecutionStep?.status.toLowerCase() === 'done') {
		swapDispatch({ type: 'SET_RESPONSE', payload: { provider, isOk: true, message: 'Success' } })
		swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'success' })
		return
	}

	if (lastExecutionStep?.status.toLowerCase() === 'failed') {
		swapDispatch({ type: 'SET_RESPONSES', payload: { provider, isOk: false, message: stdRoute.execution.error } })
		swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'failure' })
	}
}
