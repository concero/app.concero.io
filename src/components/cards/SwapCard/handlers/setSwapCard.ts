export const setSwapCard = (dispatch, from, to) => {
	dispatch({
		type: 'SET_SWAP_CARD',
		payload: {
			from: {
				// chainId: from.chain.id,
				chain: {
					id: from.chain.id,
					name: from.chain.name,
					logoURI: from.chain.logoURI,
					symbol: from.chain.symbol,
				},
				token: {
					symbol: from.token.symbol,
					address: from.token.address,
					logoURI: from.token.logoURI,
					coinGeckoId: from.token.coinGeckoId,
				},
			},
			to: {
				// chainId: to.chain.id,
				chain: {
					id: to.chain.id,
					name: to.chain.name,
					logoURI: to.chain.logoURI,
					symbol: to.chain.symbol,
				},
				token: {
					symbol: to.token.symbol,
					address: to.token.address,
					logoURI: to.token.logoURI,
					coinGeckoId: to.token.coinGeckoId,
				},
			},
		},
	})
}
