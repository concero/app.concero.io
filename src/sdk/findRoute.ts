import mockRoute from './assets/mockRoute.json'
import { type RouteRequest } from './types'

export const findRoute = async (routeReqest: RouteRequest) => {
	// TODO make a request to find the route by api when it's ready
	console.log('routeReqest: ', routeReqest)

	// make promisse
	return await new Promise(resolve => {
		resolve(mockRoute)
	})
}
