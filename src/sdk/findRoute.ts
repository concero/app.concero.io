import { type RouteRequest } from './types/routeTypes'
import { get } from '../api/client'

export const findRoute = async (routeRequest: RouteRequest) => {
	const { fromChainId, fromTokenAddress, toTokenAddress, fromAmount } = routeRequest

	try {
		const routeRes = await get(
			`${process.env.CONCERO_API_URL}/route/?fromToken=${fromTokenAddress}&toToken=${toTokenAddress}&fromChainId=${fromChainId}&toChainId=${fromChainId}&amount=${fromAmount}&slippageTolerance=0.5`,
		)

		if (!routeRes) throw new Error('Route not found!')

		if (!routeRes.data.success) {
			throw new Error(routeRes.data.data)
		}

		return routeRes.data
	} catch (error) {
		console.error('Error while finding route: ', error)
	}
}
