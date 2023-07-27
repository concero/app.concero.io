import { ExecutionSettings, LiFi } from '@lifi/sdk'
import { Signer } from 'ethers'
import { FetchRoutesParams, Route } from './types'
import { standardiseRoute } from './standardiseRoute'
import { tokens } from '../../constants/tokens'
import { addingDecimals } from '../../utils/formatting'

interface GetRoutes {
  routes: Route[]
}

const getTokenDecimalsByAddress = (chainId: number, tokenAddress: string): number => {
  return tokens[chainId].find((token) => token.address === tokenAddress).decimals
}

const lifi = new LiFi({ integrator: 'concero' })

export const fetchRoutes = async ({ from, to }: FetchRoutesParams): Promise<GetRoutes | null> => {
  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: addingDecimals(Number(from.amount), getTokenDecimalsByAddress(from.chain.id, from.token.address)),
    fromTokenAddress: from.token.address,
    fromAddress: from.address, // todo: hangs if address is provided
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: to.address,
  }

  console.log('fetchRoutes routesRequest', routesRequest)

  const response = await lifi.getRoutes(routesRequest)

  console.log('fetchRoutes response', response)
  if (!response.routes) return null
  const result = {
    routes: [...response.routes.map((route) => standardiseRoute(route))],
    originalRoutes: response.routes,
  }
  return result
}

export const executeRoute = async (signer: Signer, route: Route, settings?: ExecutionSettings): Promise<Route> => {
  return await lifi.executeRoute(signer, route, settings)
}
