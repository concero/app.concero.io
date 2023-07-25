import { get } from '../clientProxy'
import { fromNow } from '../../utils/formatting'

export const fetchTransactionHistory = async (tokensPair: string) => {
  // const url = `https://io.dexscreener.com/dex/log/amm/${tokensPair.dexId}/all/${tokensPair.chainId}/${tokensPair.pairAddress}`

  const url = `https://www.dextools.io/shared/data/swaps?chain=${tokensPair.chainId}&pair=${tokensPair.pairAddress}`
  const response = await get(url)

  if (response.status !== 200) throw new Error('Error fetching transaction history')

  return response.data.data.swaps.reduce((acc, item) => {
    acc.push({
      from: tokensPair.baseToken.symbol,
      to: tokensPair.quoteToken.symbol,
      type: item.type,
      value: item.price.toFixed(4).toString(),
      created_at: fromNow(item.timestamp * 1000),
    })

    return acc
  }, [])
}
