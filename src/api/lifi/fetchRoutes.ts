import { LiFi } from '@lifi/sdk'
import { FetchRoutesParams, Route } from './types'
import { standardiseRoute } from './standardiseRoute'
import { tokens } from '../../constants/tokens'

interface GetRoutes {
  routes: Route[]
}

const getTokenDecimalsByAddress = (chainId: number, tokenAddress: string): number => tokens[chainId].find((token) => token.address === tokenAddress).decimals

export const fetchRoutes = async ({ from, to }: FetchRoutesParams): Promise<GetRoutes | null> => {
  const lifi = new LiFi({ integrator: 'concero' })

  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: from.amount.toString() + '0'.repeat(getTokenDecimalsByAddress(from.chain.id, from.token.address)),
    fromTokenAddress: from.token.address,
    fromAddress: from.address, // todo: hangs if address is provided
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: to.address,
  }

  console.log('fetchRoutes routesRequest', routesRequest)
  const response = await lifi.getRoutes(routesRequest)
  if (!response.routes) return null

  const result = {
    routes: [...response.routes.map((route) => standardiseRoute(route))],
    originalRoutes: response.routes,
  }
  return result
}
