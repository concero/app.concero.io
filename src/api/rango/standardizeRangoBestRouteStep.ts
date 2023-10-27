import { SwapResult } from 'rango-types/src/api/main/common'
import BigNumber from 'bignumber.js'
import { Step } from '../../types/StandardRoute'
import { roundNumberByDecimals } from '../../utils/formatting'

export function standardizeRangoBestRouteStep(step: SwapResult): Step {
	return {
		id: step.swapperId,
		from: {
			token: {
				name: step.from.symbol,
				address: step.from.address,
				symbol: step.from.symbol,
				decimals: step.from.decimals,
				price_usd: step.from.usdPrice,
				amount: step.fromAmount,
				amount_usd: roundNumberByDecimals(new BigNumber(step.from.usdPrice).times(new BigNumber(step.fromAmount)).toString()),
				logo_uri: step.from.logo,
			},
			chain: {
				id: step.from.blockchain,
			},
		},
		to: {
			token: {
				name: step.to.symbol,
				address: step.to.address,
				symbol: step.to.symbol,
				decimals: step.to.decimals,
				price_usd: step.to.usdPrice,
				amount: step.toAmount,
				amount_usd: roundNumberByDecimals(new BigNumber(step.to.usdPrice).times(new BigNumber(step.toAmount)).toString(), 4),
				logo_uri: step.to.logo,
			},
			chain: {
				id: step.to.blockchain,
			},
		},
		tool: {
			name: step.swapperId,
			estimated_execution_time_seconds: step.estimatedTimeInSeconds,
			slippage_limit: null,
			fees_usd: null,
			gas: roundNumberByDecimals(step.fee[0].amount) + ' ' + step.fee[0].asset.symbol,
			gas_usd: null,
			logo_uri: step.swapperLogo,
		},
	}
}
