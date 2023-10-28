import { SwapFee, SwapResult } from 'rango-types/src/api/main/common'
import BigNumber from 'bignumber.js'
import { Fees, Gas, Step } from '../../types/StandardRoute'
import { roundNumberByDecimals } from '../../utils/formatting'
import { rangoChaindMap } from './rangoChainsMap'

function getFees(step: SwapResult): Fees[] | Gas[] | [] {
	return step.fee.map((feeItem: SwapFee): Fees => {
		return {
			amount: roundNumberByDecimals(feeItem.amount, 2) as string,
			asset: {
				chainId: rangoChaindMap[feeItem.asset.blockchain] as string,
				symbol: feeItem.asset.symbol,
				address: feeItem.asset.address ?? null,
			},
		}
	})
}

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
				logo_uri: step.from.logo,
			},
			chain: {
				id: step.from.blockchain,
			},
		},
		to: {
			token: {
				name: step.to.symbol,
				address: step.to.address as string,
				symbol: step.to.symbol,
				decimals: step.to.decimals,
				price_usd: step.to.usdPrice?.toString() ?? null,
				amount: step.toAmount,
				amount_usd: roundNumberByDecimals(new BigNumber(step.to.usdPrice as number).times(new BigNumber(step.toAmount)).toString(), 4) as string,
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
			fees: getFees(step),
			gas: getFees(step) as Gas[],
			gas_usd: null,
			logo_uri: step.swapperLogo,
		},
	}
}
