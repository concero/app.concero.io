import { get } from '../client'

export const fetchCurrentTokenPriceUSD = async (tokenId: string) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
  const response = await get(url)
  if (response.status !== 200) return

  return response.data[tokenId].usd
}
