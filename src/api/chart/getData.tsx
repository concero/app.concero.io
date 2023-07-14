import { get } from '../clientProxy'

const toLocalTime = (timestamp: string) => {
  const currentTime = new Date()
  const timeZoneOffsetInSeconds = currentTime.getTimezoneOffset() * 60
  return Number(timestamp) / 1000 - timeZoneOffsetInSeconds
}

interface Item {
  0: string
  1: number
}

export const getData = async (chain: string, currency: string, days: string) => {
  const url = `https://api.coingecko.com/api/v3/coins/${chain}/market_chart?vs_currency=${currency}&days=${days}`
  const response = await get(url)

  if (response.status === 200) {
    return response.data.prices.map((item: Item) => {
      return {
        time: toLocalTime(item[0]),
        value: item[1],
      }
    })
  } else {
    throw new Error('Error fetching data')
    return []
  }
}
