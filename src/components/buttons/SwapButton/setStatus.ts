import { Direction, StandardRoute } from '../../../types/StandardRoute'
import { SwapButtonAction } from './buttonReducer'
import { Dispatch } from 'react'

const handleResponse = (response: { isOk: boolean; message: string }, routes: StandardRoute[], dispatch: Dispatch<SwapButtonAction>) => {
	if (!response.isOk) {
		switch (response.message) {
			case 'No routes found':
				if (!routes.length) {
					dispatch({ type: 'NO_ROUTES' })
				}
				break
		}
	} else {
		dispatch({ type: 'SUCCESS' })
	}
}

export const setStatus = (
	from: Direction,
	to: Direction,
	isConnected: boolean,
	isLoading: boolean,
	dispatch: Dispatch<SwapButtonAction>,
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
		return handleResponse(response, routes, dispatch)
	}

	if (!from.amount || (from.amount && !routes.length)) {
		return dispatch({ type: 'NO_AMOUNT' })
	}

	// if (to.chain.destinationAddressRequired) {
	// 	if (!to.address) return dispatch({ type: 'NO_DESTINATION_ADDRESS' })
	// }

	if (balance && Number(from.amount) > parseFloat(balance)) {
		return dispatch({ type: 'LOW_BALANCE' })
	}

	if (from.amount && to.amount && routes.length) {
		return dispatch({ type: 'SWAP' })
	}
}
