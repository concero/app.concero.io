import { numberToFormatString } from '../../utils/formatting'

export const getRangoRouteStep = (step, index) => ({
	id: index.toString(),
	from: {
		token: {
			name: step.from.name,
			address: step.from.address,
			symbol: step.from.symbol,
			decimals: step.from.decimals,
			price_usd: step.from.usdPrice,
			amount: step.inputAmount,
			logo_uri: step.from.image,
		},
		chain: {
			id: step.from.chainId,
		},
	},
	to: {
		token: {
			name: step.to.name,
			address: step.to.address,
			symbol: step.to.symbol,
			decimals: step.to.decimals,
			price_usd: step.to.usdPrice,
			logo_uri: step.to.image,
			amount: numberToFormatString(step.expectedOutput / 10 ** step.to.decimals, 2),
		},
		chain: {
			id: step.to.chainId,
		},
	},
	tool: {
		name: step.swapper.id,
		estimated_execution_time_seconds: step.estimatedTimeInSeconds,
		slippage_limit: null,
		fees_usd: null,
		gas: null,
		gas_usd: null,
		logo_uri: step.swapper.logo,
	},
})
