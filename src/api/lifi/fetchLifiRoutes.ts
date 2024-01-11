import { type StandardRoute } from '../../types/StandardRoute'
import { standardiseLifiRoute } from './standardiseLifiRoute'
import { addingAmountDecimals } from '../../utils/formatting'
import { lifi } from './lifi'
import { type FetchRoutesParams } from './types'
import { type RoutesRequest } from '@lifi/types'
import { type RouteOptions } from '@lifi/types/dist/api'
import { config } from '../../constants/config'

const sortByTags = (routeA: StandardRoute, routeB: StandardRoute): number => {
	const tagsOrder = ['RECOMMENDED', 'CHEAPEST', 'FASTEST']
	const tagIndexA = routeA.tags ? tagsOrder.indexOf(routeA.tags[0]) : -1
	const tagIndexB = routeB.tags ? tagsOrder.indexOf(routeB.tags[0]) : -1

	if (tagIndexA === -1 && tagIndexB === -1) return 0
	if (tagIndexA === -1) return 1
	if (tagIndexB === -1) return -1
	if (tagIndexA > tagIndexB) return 1
	return 0
}

export const fetchLifiRoutes = async ({ from, to, settings }: FetchRoutesParams): Promise<StandardRoute[] | []> => {
	let result: StandardRoute[] | [] = []

	const routeOptions: RouteOptions = {
		fee: parseFloat(config.LIFI_FEES),
		insurance: false,
		integrator: config.LIFI_INTEGRATOR,
		slippage: Number(settings.slippage_percent || 5) / 100,
		allowSwitchChain: settings.allowSwitchChain,
	}

	const routesRequest: RoutesRequest = {
		fromChainId: Number(from.chain.id),
		fromAmount: addingAmountDecimals(Number(from.amount), from.token.decimals)!,
		fromTokenAddress: from.token.address!,
		fromAddress: from.address!,
		toChainId: Number(to.chain.id),
		toTokenAddress: to.token.address!,
		toAddress: to.address!,
		options: routeOptions,
	}

	const response = await lifi.getRoutes(routesRequest)

	if (response.routes.length > 0) {
		result = [...response.routes.map(route => standardiseLifiRoute(route))]
		result.sort(sortByTags)
	}

	return result
}
