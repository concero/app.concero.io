import { get } from '../client'

export interface fetchRouteParams {
	fromToken: string
	toToken: string
	fromChainId: number
	toChainId: number
	amount: string
	slippageTolerance: string
}

export const fetchRoute = async ({
	fromToken,
	toToken,
	fromChainId,
	toChainId,
	amount,
	slippageTolerance,
}: fetchRouteParams) => {
	const url = `http://localhost:4000/api/get_route`
	const params = {
		fromToken,
		toToken,
		fromChainId,
		toChainId,
		amount,
		slippageTolerance,
	}
	const response = await get(url, params)
	console.log('response', response)
	if (response.status !== 200) throw new Error(response.statusText)
	return response.data.data
}
