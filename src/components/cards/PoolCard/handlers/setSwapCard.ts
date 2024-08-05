import { type Dispatch } from 'react'
import { type SwapAction, type SwapStateDirection } from '../swapReducer/types'

export const setSwapCard = (dispatch: Dispatch<SwapAction>, from: SwapStateDirection, to: SwapStateDirection) => {
	dispatch({
		type: 'SET_SWAP_CARD',
		payload: {
			from: {
				chain: from.chain,
				token: from.token,
			},
			to: {
				chain: to.chain,
				token: to.token,
			},
		},
	})
}
