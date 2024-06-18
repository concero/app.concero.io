import mockRoute from './assets/mockBridgeRoute.json'
import { type RouteRequest } from './types/routeTypes'

export const findRoute = async (routeReqest: RouteRequest) => {
	// TODO make a request to find the route by api when it's ready
	return await new Promise(resolve => { resolve(mockRoute); })
}
