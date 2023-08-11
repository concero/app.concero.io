import { RangoClient } from 'rango-sdk-basic'
import { addingDecimals } from '../../utils/formatting'
import { standardizeRangoRoutes } from './standardizeRangoRoutes'

export const rangoClient = new RangoClient(process.env.RANGO_API_KEY)

const nullAddress = '0x0000000000000000000000000000000000000000'

export const fetchRangoRoutes = async ({ from, to }) => {
  const routesRequest = {
    from: {
      blockchain: from.chain.providers.rango.key,
      symbol: from.token.symbol,
      address: from.token.address === nullAddress ? null : from.token.address,
    },
    to: {
      blockchain: to.chain.providers.rango.key,
      symbol: to.token.symbol,
      address: to.token.address === nullAddress ? null : to.token.address,
    },
    amount: addingDecimals(Number(from.amount), from.token.decimals),
  }

  console.log('routesRequest', routesRequest)

  const quote = await rangoClient.quote(routesRequest)

  return standardizeRangoRoutes(quote)
}
