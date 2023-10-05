import { fetchTokenPrice } from '../../../../../api/enso/fetchTokenPrice'

export async function getCurrentPriceToken(selection, setCurrentUsdPrice) {
	try {
		const response = await fetchTokenPrice(selection.chain.id, selection.token.address)
		setCurrentUsdPrice(response?.price ?? null)
	} catch (error) {
		console.log('ERROR: ', error)
		setCurrentUsdPrice(null)
	}
}
