import { fetchCurrentTokenPriceUSD } from '../../../../../api/coinGecko/fetchCurrentTokenPriceUSD'

export async function getCurrentPriceToken(selection, setCurrentUsdPrice) {
  try {
    const response = await fetchCurrentTokenPriceUSD(selection.token.coinGeckoId)
    setCurrentUsdPrice(response)
  } catch (error) {
    console.log('ERROR: ', error)
    setCurrentUsdPrice(null)
  }
}
