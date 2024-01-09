import { type SwapFee, type SwapResult } from 'rango-types/src/api/main/common'
import BigNumber from 'bignumber.js'
import { type Fees, type Gas, type Step } from '../../types/StandardRoute'
import { roundNumberByDecimals } from '../../utils/formatting'
import { rangoChainsMap } from './rangoChainsMap'
import { config } from '../../constants/config'

function getFees(step: SwapResult): Fees[] | Gas[] | [] {
	return step.fee.map((feeItem: SwapFee): Fees => {
		return {
			amount: roundNumberByDecimals(feeItem.amount, 2)!,
			asset: {
				chainId: rangoChainsMap[feeItem.asset.blockchain],
				symbol: feeItem.asset.symbol,
				address: feeItem.asset.address ?? config.NULL_ADDRESS,
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
				id: rangoChainsMap[step.from.blockchain],
			},
		},
		to: {
			token: {
				name: step.to.symbol,
				address: step.to.address!,
				symbol: step.to.symbol,
				decimals: step.to.decimals,
				price_usd: step.to.usdPrice?.toString() ?? null,
				amount: step.toAmount,
				amount_usd: roundNumberByDecimals(new BigNumber(step.to.usdPrice!).times(new BigNumber(step.toAmount)).toString(), 4)!,
				logo_uri: step.to.logo,
			},
			chain: {
				id: rangoChainsMap[step.to.blockchain],
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
