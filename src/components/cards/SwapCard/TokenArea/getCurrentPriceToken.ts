import { fetchCurrentTokenPriceUSD } from '../../../../api/coinGecko/fetchCurrentTokenPriceUSD'

export const getCurrentPriceToken = async (selection, tokenAreaDispatch) => {
	try {
		const response = await fetchCurrentTokenPriceUSD(selection.token.coinGeckoId)
		tokenAreaDispatch({ type: 'SET_CURRENT_TOKEN_PRICE_USD', payload: response })
	} catch (error) {
		console.error('ERROR: ', error)
		tokenAreaDispatch({ type: 'SET_CURRENT_TOKEN_PRICE_USD', payload: null })
	}
}
