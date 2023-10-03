import { Dispatch, MutableRefObject } from 'react'
import { ManageAction, ManageState } from './useManageReducer/types'
import { clearRoute } from './clearRoute'
import { Status } from './constants'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { fetchEnsoQuote } from '../../../../api/enso'

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

async function fetchQuote(state: ManageState, dispatch: Dispatch<ManageAction>) {
	dispatch({ type: 'SET_LOADING', payload: true })
	dispatch({ type: 'SET_STATUS', payload: Status.loading })
	try {
		const route = await fetchEnsoQuote({
			chainId: state.from.chain.id,
			fromAddress: state.address,
			amountIn: addingAmountDecimals(state.from.amount, state.from.token.decimals) as string,
			tokenIn: state.from.token.address,
			tokenOut: state.to.token.address,
		})
		if (!route) return dispatch({ type: 'SET_STATUS', payload: Status.noRoute })
		dispatch({ type: 'SET_ROUTE', payload: route, fromAmount: state.from.amount })
	} catch (error) {
		console.log(error)
		handleError(error, dispatch)
	} finally {
		dispatch({ type: 'SET_LOADING', payload: false })
	}
}

export async function getQuote({ manageState, manageDispatch, typingTimeoutRef }: IGetQuote) {
	if (!manageState.from.amount) return clearRoute(manageDispatch, typingTimeoutRef)
	try {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		const typingTimeoutId = setTimeout(() => fetchQuote(manageState, manageDispatch), 700)
		typingTimeoutRef.current = typingTimeoutId
	} catch (error) {
		console.error('[getQuote] ', error)
	}
}
