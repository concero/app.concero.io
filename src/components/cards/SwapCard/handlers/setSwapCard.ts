import { type Dispatch } from 'react'
import { type SwapAction, type SwapStateDirection } from '../swapReducer/types'

export const setSwapCard = (dispatch: Dispatch<SwapAction>, from: SwapStateDirection, to: SwapStateDirection) => {
	dispatch({
		type: 'SET_SWAP_CARD',
		payload: {
			from: {
				chain: {
					id: from.chain.id,
					name: from.chain.name,
					logoURI: from.chain.logoURI,
					symbol: from.chain.symbol,
					providers: from.chain.providers,
				},
				token: {
					symbol: from.token.symbol,
					address: from.token.address,
					logoURI: from.token.logoURI,
					coinGeckoId: from.token.coinGeckoId,
					decimals: from.token.decimals,
				},
			},
			to: {
				chain: {
					id: to.chain.id,
					name: to.chain.name,
					logoURI: to.chain.logoURI,
					symbol: to.chain.symbol,
					providers: to.chain.providers,
				},
				token: {
					symbol: to.token.symbol,
					address: to.token.address,
					logoURI: to.token.logoURI,
					coinGeckoId: to.token.coinGeckoId,
					decimals: to.token.decimals,
				},
			},
		},
	})
}
