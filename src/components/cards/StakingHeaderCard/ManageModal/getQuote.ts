import { Dispatch, MutableRefObject } from 'react'
import { fetchQuote } from '../../../../api/wido/fetchQuote'
import { ManageAction, ManageState } from './useManageReducer/types'
import { clearRoute } from './clearRoute'
import { Status } from './constants'
import { retryRequest } from '../../../../utils/retryRequest'

interface IGetQuote {
	manageState: ManageState
	manageDispatch: Dispatch<ManageAction>
	typingTimeoutRef: MutableRefObject<any>
}

function handleError(error: Error, manageDispatch: Dispatch<ManageAction>) {
	if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
	} else if (error.message.includes('FAILED_DEPENDENCY')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.noRoute })
	} else {
		manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
	}
}

async function handleFetchQuote(manageState: ManageState, manageDispatch: Dispatch<ManageAction>) {
	manageDispatch({ type: 'SET_LOADING', payload: true })
	manageDispatch({ type: 'SET_STATUS', payload: Status.loading })
	try {
		const route = await retryRequest(
			async () => await fetchQuote(manageState),
			(e: any) => !e.message.includes('FAILED_DEPENDENCY'),
			3,
		)
		if (!route) return manageDispatch({ type: 'SET_STATUS', payload: Status.noRoute })
		manageDispatch({ type: 'SET_ROUTE', payload: route, fromAmount: manageState.from.amount })
	} catch (error) {
		console.log(error)
		handleError(error, manageDispatch)
	} finally {
		manageDispatch({ type: 'SET_LOADING', payload: false })
	}
}

export async function getQuote({ manageState, manageDispatch, typingTimeoutRef }: IGetQuote) {
	if (!manageState.from.amount) return clearRoute(manageDispatch, typingTimeoutRef)
	try {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		const typingTimeoutId = setTimeout(() => handleFetchQuote(manageState, manageDispatch), 700)
		typingTimeoutRef.current = typingTimeoutId
	} catch (error) {
		console.error('[getQuote] ', error)
	}
}
