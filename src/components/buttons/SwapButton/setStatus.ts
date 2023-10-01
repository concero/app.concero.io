import { Dispatch, From, To } from './types'
import { StandardRoute } from '../../../api/lifi/types'

const handleresponse = (response: { isOk: boolean; message: string }, routes: StandardRoute[], dispatch: Dispatch) => {
	if (!response.isOk) {
		switch (response.message) {
			// case 'user rejected':
			//   dispatch({ type: 'CANCELED' })
			//   break
			// case 'unknown error':
			//   dispatch({ type: 'WRONG' })
			//   break
			case 'No routes found':
				if (!routes.length) {
					dispatch({ type: 'NO_ROUTES' })
				}
				break
			// case 'Insufficient balance':
			//   dispatch({ type: 'LOW_BALANCE' })
			//   break
			// default:
			//   dispatch({ type: 'SET_RESPONSE', payload: response })
			//   break
		}
	} else {
		dispatch({ type: 'SUCCESS' })
	}
}

export const setStatus = (
	from: From,
	to: To,
	isConnected: boolean,
	isLoading: boolean,
	dispatch: Dispatch,
	routes: StandardRoute[],
	balance: string,
	response: {
		isOk: boolean
		message: string
	},
) => {
	if (isLoading) {
		return dispatch({ type: 'LOADING' })
	}

	if (!isConnected) {
		return dispatch({ type: 'DISCONNECTED' })
	}

	if (response) {
		return handleresponse(response, routes, dispatch)
	}

	if (!from.amount || (from.amount && !routes.length)) {
		return dispatch({ type: 'NO_AMOUNT' })
	}

	if (to.chain.destinationAddressRequired) {
		if (!to.address) return dispatch({ type: 'NO_DESTINATION_ADDRESS' })
	}

	if (balance && from.amount > parseFloat(balance)) {
		return dispatch({ type: 'LOW_BALANCE' })
	}

	if (from.amount && to.amount && routes.length) {
		return dispatch({ type: 'SWAP' })
	}
}
