import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { TransactionStatus } from 'rango-types/src/api/shared/transactions'
import { SwapAction } from '../swapReducer/types'
import { Dispatch } from 'react'

export const handleRangoResponse = (executedRoute, swapDispatch: Dispatch<SwapAction>, provider: 'lifi' | 'rango') => {
	if (executedRoute.status === TransactionStatus.FAILED) {
		swapDispatch({ type: 'SET_RESPONSE', payload: { provider, isOk: false, message: executedRoute.error } })
		swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'failure' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'failed' })
	} else if (executedRoute.status === 'success') {
		swapDispatch({ type: 'SET_RESPONSE', payload: { provider, isOk: true, message: 'Success' } })
		swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'success' })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'success' })
	}
}

export const handleLifiResponse = (executedRoute, swapDispatch: Dispatch<SwapAction>, provider: 'lifi' | 'rango') => {
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
