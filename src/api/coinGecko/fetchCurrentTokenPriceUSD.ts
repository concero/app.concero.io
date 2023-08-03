import { get } from '../client'
import { getCoingeckoTokenIdBySymbol } from './getCoingeckoTokenIdBySymbol'

export const fetchCurrentTokenPriceUSD = async (tokenSymbol: string) => {
  const tokenId = getCoingeckoTokenIdBySymbol(tokenSymbol)
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
  const response = await get(url)
  if (response.status !== 200) return

  return response.data[tokenId].usd
}
