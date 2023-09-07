import { rangoClient } from './rangoClient'
import { addingDecimals } from '../../utils/formatting'
import { standardizeRangoRoutes } from './standardizeRangoRoutes'
import { config } from '../../constants/config'

export const fetchRangoRoutes = async ({ from, to, settings }) => {
  // todo: how to control rango slippage?
  const routesRequest = {
    from: {
      blockchain: from.chain.providers.rango.key,
      symbol: from.token.symbol,
      address: from.token.address === config.NULL_ADDRESS ? null : from.token.address,
    },
    to: {
      blockchain: to.chain.providers.rango.key,
      symbol: to.token.symbol,
      address: to.token.address === config.NULL_ADDRESS ? null : to.token.address,
    },
    slippage: settings.slippage_percent,
    amount: addingDecimals(Number(from.amount), from.token.decimals),
    // slippage: '0.1',
    // slippage_percent: '0.1',
    // slippage_limit: '0.1',
  }

  const quote = await rangoClient.quote(routesRequest)
  if (quote.route === null) return []

  return [standardizeRangoRoutes(quote)]
}
