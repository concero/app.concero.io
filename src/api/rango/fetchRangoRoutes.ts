import { rangoClient } from './rangoClient'
import { addingDecimals } from '../../utils/formatting'
import { standardizeRangoRoutes } from './standardizeRangoRoutes'
import { tokenNullAddress } from '../../constants/tokenNullAddress'

export const fetchRangoRoutes = async ({ from, to, settings }) => {
  // todo: how to control rango slippage?
  const routesRequest = {
    from: {
      blockchain: from.chain.providers.rango.key,
      symbol: from.token.symbol,
      address: from.token.address === tokenNullAddress ? null : from.token.address,
    },
    to: {
      blockchain: to.chain.providers.rango.key,
      symbol: to.token.symbol,
      address: to.token.address === tokenNullAddress ? null : to.token.address,
    },
    amount: addingDecimals(Number(from.amount), from.token.decimals),
  }

  const quote = await rangoClient.quote(routesRequest)
  if (quote.route === null) return []

  return [standardizeRangoRoutes(quote)]
}
