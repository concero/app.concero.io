import { get } from '../clientProxy'

export const fetchCurrentTokenPriceUSD = async (chainId: string, tokenSymbol: string) => {
  const url = `https://li.quest/v1/token?chain=${chainId}&token=${tokenSymbol}`
  const response = await get(url)

  if (response.status !== 200) return

  return response.data.priceUSD
}
