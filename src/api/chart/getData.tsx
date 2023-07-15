import { get } from '../clientProxy'

const toLocalTime = (timestamp: number): number => {
  const currentTime = new Date()
  const timeZoneOffsetInSeconds = currentTime.getTimezoneOffset() * 60
  return Number(timestamp) / 1000 - timeZoneOffsetInSeconds
}

interface Item {
  0: number
  1: number
}

export const getData = async (chain: string, currency: string, days: string, isCropNeeded: boolean) => {
  const url = `https://api.coingecko.com/api/v3/coins/${chain}/market_chart?vs_currency=${currency}&days=${days}`
  const response = await get(url)

  if (response.status === 200) {
    return response.data.prices.reduce((acc: Item[], item: Item, index: number) => {
      if (isCropNeeded && index % 2 !== 0) return acc

      acc.push({
        time: toLocalTime(item[0]),
        value: item[1],
      })

      return acc
    }, [])
  }
}
