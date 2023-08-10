import { Chain, ExecutionSettings, LiFi } from '@lifi/sdk'
import { WalletClient } from 'wagmi'
import { Account, Transport } from 'viem'
import { FetchRoutesParams, Route } from './types'
import { standardiseLifiRoute } from './standardiseLifiRoute'
import { tokens } from '../../constants/tokens'
import { addingDecimals } from '../../utils/formatting'

interface GetRoutes {
  (params: FetchRoutesParams): Promise<Route[]>
}

const getTokenDecimalsByAddress = (chainId: number, tokenAddress: string): number =>
  tokens[chainId].find((token) => token.address === tokenAddress).decimals

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

  const routesRequest = {
    fromChainId: from.chain.id,
    fromAmount: addingDecimals(Number(from.amount), getTokenDecimalsByAddress(from.chain.id, from.token.address)), // TODO: add decimals to from/to object
    fromTokenAddress: from.token.address,
    fromAddress: from.address, // todo: hangs if address is provided
    toChainId: to.chain.id,
    toTokenAddress: to.token.address,
    toAddress: to.address,
  }

  const response = await lifi.getRoutes(routesRequest) // TODO handle errors
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
