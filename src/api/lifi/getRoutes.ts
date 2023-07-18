import { LiFi } from '@lifi/sdk'
import { GetRoutesParams, Route } from './types'
import { getRoute } from './getRoute'

interface GetRoutes {
  routes: Route[]
}

export const getRoutes = async ({ from, to }: GetRoutesParams): Promise<GetRoutes | null> => {
  const lifi = new LiFi({ integrator: 'concero' })

  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: from.amount,
    fromTokenAddress: from.token.address,
    fromAddress: from.address, // todo: hangs if address is provided
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: to.address,
  }

  const response = await lifi.getRoutes(routesRequest)

  if (!response.routes) return null

  const result = {
    routes: [...response.routes.map((route) => getRoute(route))],
    originalRoutes: response.routes,
  }

  return result
}
