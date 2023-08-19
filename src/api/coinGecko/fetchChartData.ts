import { get } from '../client'

interface Item {
  time: number
  value: number
}

const toLocalTime = (timestamp: number): number => {
  const currentTime = new Date()
  const timeZoneOffsetInSeconds = currentTime.getTimezoneOffset() * 60
  return Number(timestamp) - timeZoneOffsetInSeconds
}

const getPeriod = (interval) => {
  if (interval.value === '1') return '5m'
  if (interval.value === '7') return '35m'
  if (interval.value === '30') return '150m'
  if (interval.value === '365') return '1825m'
  if (interval.value === 'max') return '1w'
}

const getPointQuery = (interval) => {
  if (interval.value === 'max') return 'start=1551477600'
  const endTimestamp = Date.now() / 1000
  return `end=${endTimestamp}`
}

const getSearchWidth = (interval) => {
  if (interval.value === 'max') return '10h'
  return '10m'
}

export const fetchChartData = async (
  setData: (data: Item[]) => void,
  addNotification,
  tokenId: string,
  interval: {
    value: string
  },
) => {
  console.log('fetching ', interval)
  // const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=${'usd'}&days=${
  //   interval.value
  // }`

  // function on_ok(res) {
  //   const result = res.data.prices.reduce((acc: Item[], item: Item, index: number) => {
  //     if (interval.value === 'max' && index % 2 !== 0) return acc
  //     acc.push({
  //       time: toLocalTime(item[0]),
  //       value: item[1],
  //     })
  //     return acc
  //   }, [])
  //   setData(result)
  //   console.log('result', result)
  // }
  //
  // function on_err(res: { data: { error: any } }) {
  //   addNotification({
  //     title: "Couldn't fetch coinGecko data",
  //     message: res.data.error,
  //     color: 'red',
  //   })
  // }

  const url = `https://coins.llama.fi/chart/coingecko:${tokenId}?${getPointQuery(interval)}&span=289&period=${getPeriod(
    interval,
  )}&searchWidth=${getSearchWidth(interval)}`
  const response = await get(url)

  if (response.status !== 200) return

  const result = response.data.coins[`coingecko:${tokenId}`].prices.reduce((acc: Item[], item: Item) => {
    acc.push({
      time: toLocalTime(item.timestamp),
      value: item.price,
    })
    return acc
  }, [])

  setData(result)
}
