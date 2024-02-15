import { type Dispatch } from 'react'

interface Direction {
	token: {
		symbol: string
		address: string
		logoURI: string
		decimals: number
	}
	chain: {
		id: string
	}
}

export const setHistoryCard = (dispatch: Dispatch<any>, from: Direction, to: Direction): void => {
	dispatch({
		type: 'SET_HISTORY_CARD',
		payload: {
			from: {
				chainId: from.chain.id,
				token: from.token,
			},
			to: {
				chainId: to.chain.id,
				token: to.token,
			},
		},
	})
}
