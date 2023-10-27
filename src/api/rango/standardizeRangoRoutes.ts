import { getRangoRouteStep } from './getRangoRouteStep'
import { numberToFormatString } from '../../utils/formatting'
import { StandardRoute } from '../../types/StandardRoute'

export const standardizeRangoRoutes = (rangoResponse): StandardRoute => {
	const { route } = rangoResponse

	return {
		id: rangoResponse.requestId,
		provider: 'rango',
		from: {
			token: {
				name: route.from.name,
				address: route.from.address,
				symbol: route.from.symbol,
				decimals: route.from.decimals,
				price_usd: route.from.usdPrice,
				amount_usd: null,
				amount: null,
			},
			chain: {
				id: route.from.chainId,
			},
		},
		to: {
			token: {
				name: route.to.name,
				address: route.to.address,
				symbol: route.to.symbol,
				decimals: route.to.decimals,
				price_usd: route.to.usdPrice,
				amount_usd: route.outputAmountUsd,
				amount: numberToFormatString(route.outputAmount / 10 ** route.to.decimals, 4),
			},
			chain: {
				id: route.to.chainId,
			},
		},
		steps: [...route.path.map((step, index) => getRangoRouteStep(step, index))],
		cost: {
			total_usd: null,
			total_gas_usd: numberToFormatString(route.feeUsd, 2),
		},
		tags: [],
		slippage_percent: null,
		transaction_time_seconds: route.estimatedTimeInSeconds,
		originalRoute: route,
	}
}
