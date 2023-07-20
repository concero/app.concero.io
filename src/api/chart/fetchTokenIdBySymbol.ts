import { get } from '../clientProxy'

export const fetchTokenIdBySymbol = async (symbol: string) => {
  const url = `https://api.coingecko.com/api/v3/search?query=${symbol}`
  const response = await get(url)
  return response.data.coins[0].id
}
