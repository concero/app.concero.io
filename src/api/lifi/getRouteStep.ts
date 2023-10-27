import * as lifiTypes from '@lifi/sdk/dist/types'
import { Step } from '../../types/StandardRoute'

export const getRouteStep = (step: lifiTypes.Step): Step => {
	// const fromDecimals = step.action.fromToken.decimals
	const toDecimals = step.action.toToken.decimals

	return {
		id: step.id,
		from: {
			token: {
				name: step.action.fromToken.name,
				address: step.action.fromToken.address,
				symbol: step.action.fromToken.symbol,
				decimals: step.action.fromToken.decimals,
				price_usd: step.action.fromToken.priceUSD,
				amount: step.action.fromAmount,
				logo_uri: step.action.fromToken.logoURI,
			},
			chain: {
				id: step.action.fromChainId,
			},
		},
		to: {
			token: {
				name: step.action.toToken.name,
				address: step.action.toToken.address,
				symbol: step.action.toToken.symbol,
				decimals: step.action.toToken.decimals,
				price_usd: step.action.toToken.priceUSD,
				logo_uri: step.action.toToken.logoURI,
				amount: parseFloat(step.estimate.toAmount / 10 ** toDecimals)
					.toFixed(2)
					.toString(),
			},
			chain: {
				id: step.action.toChainId,
			},
		},
		tool: {
			name: step.toolDetails.name,
			estimated_execution_time_seconds: step.estimate.executionDuration, // todo: check if this is needed
			slippage_limit: step.action.slippage,
			// fees: step.estimate.feeCosts.reduce((acc, fee) => acc + Number(fee.amount) / 10 ** decimals, 0),
			fees_usd: step.estimate.feeCosts.reduce((acc: number, fee) => acc + Number(fee.amountUSD), 0), // todo: BREAKS WHEN theres no AMOUNT USD
			gas: step.estimate.gasCosts.reduce((acc, gas) => acc + Number(gas.amount), 0),
			gas_usd: step.estimate.gasCosts.reduce((acc, gas) => acc + Number(gas.amountUSD), 0),
			// total_cost: step.estimate.totalCost, ???
			// total_cost_usd: step.estimate.totalCostUSD, ???
			logo_uri: step.toolDetails.logoURI,
		},
	}
}
