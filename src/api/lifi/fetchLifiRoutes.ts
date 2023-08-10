import { Chain, ExecutionSettings, LiFi } from '@lifi/sdk'
import { WalletClient } from 'wagmi'
import { Account, Transport } from 'viem'
import { FetchRoutesParams, Route } from './types'
import { standardiseLifiRoute } from './standardiseLifiRoute'
import { addingDecimals } from '../../utils/formatting'

interface GetRoutes {
  (params: FetchRoutesParams): Promise<Route[]>
}

const sortByTags = (routeA: Route, routeB: Route): number => {
  const tagsOrder = ['RECOMMENDED', 'CHEAPEST', 'FASTEST']
  const tagIndexA = routeA.tags ? tagsOrder.indexOf(routeA.tags[0]) : -1
  const tagIndexB = routeB.tags ? tagsOrder.indexOf(routeB.tags[0]) : -1

  if (tagIndexA === -1 && tagIndexB === -1) return 0
  if (tagIndexA === -1) return 1
  if (tagIndexB === -1) return -1

  if (tagIndexA < tagIndexB) {
  } else if (tagIndexA > tagIndexB) {
    return 1
  } else {
    return 0
  }
}

const lifiConfig = {
  integrator: 'concero',
  defaultrouteoptions: { fee: 0.002 },
  insurance: true,
}

const lifi = new LiFi(lifiConfig)

export const fetchLifiRoutes = async ({ from, to }: FetchRoutesParams): Promise<GetRoutes> => {
  let result = []

  const routeOptions = {
    fee: 0.002,
    insurance: true,
    integrator: 'concero',
  }
  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: addingDecimals(Number(from.amount), from.token.decimals),
    fromTokenAddress: from.token.address,
    fromAddress: from.address,
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: to.address,
    options: routeOptions,
  }
  console.log('routesRequest', routesRequest)
  const response = await lifi.getRoutes(routesRequest)
  console.log('RoutesResponse', response)

  if (response.routes.length > 0) {
    result = [...response.routes.map((route) => standardiseLifiRoute(route))]
    result.sort(sortByTags)
  }
  return result
}

export const executeRoute = async (
  signer: WalletClient<Transport, Chain, Account> | null,
  route: Route,
  settings?: ExecutionSettings,
): Promise<Route> => lifi.executeRoute(signer, route, settings)
