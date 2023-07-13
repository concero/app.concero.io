import { get } from '../clientProxy'

export const getData = async (chain: string, currency: string, days: string) => {
  const url = `https://api.coingecko.com/api/v3/coins/${chain}/market_chart?vs_currency=${currency}&days=${days}`
  const response = await get(url)

  if (response.status === 200) {
    return response.data.prices.map((item) => {
      return {
        time: item[0] / 1000 + 3600,
        value: item[1],
      }
    })
  } else {
    throw new Error('Error fetching data')
    return []
  }
}
