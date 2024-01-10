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
				token: {
					symbol: from.token.symbol,
					address: from.token.address,
					logoURI: from.token.logoURI,
					decimals: from.token.decimals,
				},
			},
			to: {
				chainId: to.chain.id,
				token: {
					symbol: to.token.symbol,
					address: to.token.address,
					logoURI: to.token.logoURI,
					decimals: to.token.decimals,
				},
			},
		},
	})
}
