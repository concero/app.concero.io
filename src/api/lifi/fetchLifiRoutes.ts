import { FetchRoutesParams, StandardRoute } from './types'
import { standardiseLifiRoute } from './standardiseLifiRoute'
import { addingAmountDecimals } from '../../utils/formatting'
import { lifi } from './lifi'

interface GetRoutes {
	(params: FetchRoutesParams): Promise<StandardRoute[]>
}

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

export const fetchLifiRoutes = async ({ from, to, settings }: FetchRoutesParams): Promise<GetRoutes> => {
	let result = []
	const routeOptions = {
		fee: 0.002,
		insurance: false,
		integrator: 'concero',
		slippage: settings.slippage_percent / 100,
	}

	const routesRequest = {
		fromChainId: parseInt(from.chain.id),
		fromAmount: addingAmountDecimals(Number(from.amount), from.token.decimals),
		fromTokenAddress: from.token.address,
		fromAddress: from.address,
		toChainId: parseInt(to.chain.id),
		toTokenAddress: to.token.address,
		toAddress: to.address,
		options: routeOptions,
	}

	const response = await lifi.getRoutes(routesRequest)

	if (response.routes.length > 0) {
		result = [...response.routes.map(route => standardiseLifiRoute(route))]
		result.sort(sortByTags)
	}

	return result
}
