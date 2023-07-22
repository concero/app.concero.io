import { get } from '../clientProxy'
import { fromNow } from '../../utils/formatting'

export const fetchTransactionHistory = async (tokensPair: string) => {
  const url = `https://io.dexscreener.com/dex/log/amm/${tokensPair.dexId}/all/${tokensPair.chainId}/${tokensPair.pairAddress}`

  const response = await get(url)

  if (response.status !== 200) throw new Error('Error fetching transaction history')

  return response.data.logs.map((item) => {
    return {
      from: tokensPair.baseToken.symbol,
      to: tokensPair.quoteToken.symbol,
      type: item.txnType,
      value: item.volumeUsd,
      created_at: fromNow(item.blockTimestamp),
    }
  })
}
