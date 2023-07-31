import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from 'dayjs'
import { get } from '../clientProxy'
import { fromNow } from '../../utils/formatting'

export const fetchTransactionHistory = async (tokensPair: string) => {
  // const url = `https://io.dexscreener.com/dex/log/amm/${tokensPair.dexId}/all/${tokensPair.chainId}/${tokensPair.pairAddress}`

  dayjs.extend(updateLocale)
  dayjs.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s',
      s: 'now',
      m: 'a min',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: 'a day',
      dd: '%dd',
      M: 'a month',
      MM: '%dm',
      y: 'a year',
      yy: '%dy',
    },
  })

  const url = `https://www.dextools.io/shared/data/swaps?chain=${tokensPair.chainId}&pair=${tokensPair.pairAddress}`
  const response = await get({ url })

  if (response.status !== 200) throw new Error('Error fetching transaction history')

  const result = response.data.data.swaps.reduce((acc, item) => {
    acc.push({
      id: item.id,
      type: item.type,
      created_at: fromNow(item.timestamp * 1000),
      isBot: item.others?.bot || false,
      to: {
        symbol: tokensPair.quoteToken.symbol,
        amount: parseFloat(item.amountToken.toFixed(4)).toString(),
      },
      from: {
        symbol: tokensPair.baseToken.symbol,
        amount: parseFloat(item.amountETH.toFixed(4)).toString(),
      },
    })

    return acc
  }, [])
  console.log('result', result)
  return result
}
