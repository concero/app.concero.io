import * as types from '@lifi/sdk/dist/types'
import { getRouteStep } from './getRouteStep'
import { StandardRoute } from './types'

export const standardiseLifiRoute = (route: types.Route): StandardRoute => ({
	id: route.id,
	provider: 'lifi',
	from: {
		token: {
			name: route.fromToken.name,
			address: route.fromToken.address,
			symbol: route.fromToken.symbol,
			decimals: route.fromToken.decimals,
			price_usd: route.fromToken.priceUSD,
			amount_usd: route.fromAmountUSD,
			amount: route.fromAmount,
		},
		chain: {
			id: route.fromChainId,
		},
	},
	to: {
		token: {
			name: route.toToken.name,
			address: route.toToken.address,
			symbol: route.toToken.symbol,
			decimals: route.toToken.decimals,
			price_usd: route.toToken.priceUSD,
			amount_usd: route.toAmountUSD,
			amount: parseFloat((Number(route.toAmount) / 10 ** route.toToken.decimals).toFixed(4)).toString(),
			amount_min: route.toAmountMin,
		},
		chain: {
			id: route.toChainId,
		},
	},
	steps: [...route.steps.flatMap(step => step.includedSteps.map(includedStep => getRouteStep(includedStep)))],
	cost: {
		total_usd: Number(route.fromAmountUSD) - Number(route.toAmountUSD),
		total_gas_usd: route.gasCostUSD,
	},
	tags: route.tags,
	insurance: {
		state: route.insurance.state,
		fee_amount_usd: route.insurance.feeAmountUsd,
	},
	slippage_percent: route.steps.reduce(
		(acc, step) => acc + (step.action.slippage + step.includedSteps.reduce((innerAcc: number, innerStep) => innerAcc + innerStep.action.slippage, 0)),
		0,
	),
	transaction_time_seconds: route.steps.reduce(
		(acc: number, step) => acc + step.includedSteps.reduce((innerAcc: number, innerStep) => innerAcc + innerStep.estimate.executionDuration, 0),
		0,
	),
	execution: route.steps.map(step => step.execution),
	originalRoute: route,
})
