import { get } from '../requests'

interface Item {
  time: number
  value: number
}

const toLocalTime = (timestamp: number): number => {
  const currentTime = new Date()
  const timeZoneOffsetInSeconds = currentTime.getTimezoneOffset() * 60
  return Number(timestamp) / 1000 - timeZoneOffsetInSeconds
}

export const fetchChartData = async (
  setData: (data: Item[]) => void,
  addNotification,
  tokenId: string,
  interval: {
    value: string
  },
) => {
  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=${'usd'}&days=${
    interval.value
  }`

  function on_ok(res) {
    const result = res.data.prices.reduce((acc: Item[], item: Item, index: number) => {
      if (interval.value === 'max' && index % 2 !== 0) return acc
      acc.push({
        time: toLocalTime(item[0]),
        value: item[1],
      })
      return acc
    }, [])
    setData(result)
  }

  function on_err(res: { data: { error: any } }) {
    addNotification({
      title: "Couldn't fetch chart data",
      message: res.data.error,
      color: 'red',
    })
  }

  get({ url }, on_ok, on_err)
}
