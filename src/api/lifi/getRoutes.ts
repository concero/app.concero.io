import { LiFi } from '@lifi/sdk'
import { GetRoutesParams, Route } from './types'
import { routeStandardize } from './routeStandardize'
import { tokens } from '../../constants/tokens'

interface GetRoutes {
  routes: Route[]
}

const getTokenDecimalsByAddress = (chainId: number, tokenAddress: string): number => {
  return tokens[chainId].find((token) => token.address === tokenAddress).decimals
}

export const getRoutes = async ({ from, to, address }: GetRoutesParams): Promise<GetRoutes | null> => {
  const lifi = new LiFi({ integrator: 'concero' })

  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: from.amount.toString() + '0'.repeat(getTokenDecimalsByAddress(from.chain.id, from.token.address)),
    fromTokenAddress: from.token.address,
    fromAddress: address, // todo: hangs if address is provided
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: address,
  }

  console.log('getRoutes routesRequest', routesRequest)

  const response = await lifi.getRoutes(routesRequest)

  if (!response.routes) return null

  const result = {
    routes: [...response.routes.map((route) => routeStandardize(route))],
    originalRoutes: response.routes,
  }

  // console.log('getRoutes result', result.routes)

  return result
}
