import * as lifiTypes from '@lifi/sdk/dist/types'
import { standardizeLifiStep } from './standardizeLifiStep'
import { StandardRoute } from '../../types/StandardRoute'
import BigNumber from 'bignumber.js'
import { addingTokenDecimals, roundNumberByDecimals } from '../../utils/formatting'

export const standardiseLifiRoute = (route: lifiTypes.Route): StandardRoute => ({
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
			amount: addingTokenDecimals(route.toAmount, route.toToken.decimals),
			amount_min: route.toAmountMin,
		},
		chain: {
			id: route.toChainId,
		},
	},
	steps: [...route.steps.flatMap(step => step.includedSteps.map(includedStep => standardizeLifiStep(includedStep)))],
	cost: {
		total_usd: roundNumberByDecimals(new BigNumber(route.fromAmountUSD).minus(route.toAmountUSD).toString(), 2),
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
		(acc: number, step) => acc + step.includedSteps.reduce((innerAcc: number, innerStep) => innerAcc + parseInt(innerStep.estimate.executionDuration), 0),
		0,
	),
	execution: route.steps.map(step => step.execution),
	originalRoute: route,
})
