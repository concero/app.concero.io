import { type SwapFee, type SwapResult } from 'rango-types/src/api/main/common'
import BigNumber from 'bignumber.js'
import { type Fees, FeeTypes, type Gas, type Step, StepTypes } from '../../types/StandardRoute'
import { roundNumberByDecimals } from '../../utils/formatting'
import { rangoChainsMap } from './rangoChainsMap'
import { config } from '../../constants/config'

function getFees(step: SwapResult): Fees[] | Gas[] | [] {
	const result: Fees[] = []

	step.fee.forEach((feeItem: SwapFee) => {
		if (feeItem.expenseType !== 'FROM_SOURCE_WALLET') {
			return
		}

		result.push({
			amount: roundNumberByDecimals(feeItem.amount, 2)!,
			type: FeeTypes.fee,
			asset: {
				chainId: rangoChainsMap[feeItem.asset.blockchain],
				symbol: feeItem.asset.symbol,
				address: feeItem.asset.address ?? config.NULL_ADDRESS,
			},
		})
	})

	return result
}

export function standardizeRangoBestRouteStep(step: SwapResult): Step {
	const type = step.swapperType === 'BRIDGE' ? StepTypes.bridge : StepTypes.swap

	return {
		id: step.swapperId,
		type,
		from: {
			token: {
				name: step.from.symbol,
				address: step.from.address,
				symbol: step.from.symbol,
				decimals: step.from.decimals,
				price_usd: step.from.usdPrice,
				amount: step.fromAmount,
				amount_usd: null,
				logo_uri: step.from.logo,
			},
			chain: {
				id: rangoChainsMap[step.from.blockchain],
				logo_uri: `${config.CONCERO_ASSETS_URI}/icons/chains/filled/${
					rangoChainsMap[step.from.blockchain]
				}.svg`,
			},
			address: step.from.address,
		},
		to: {
			token: {
				name: step.to.symbol,
				address: step.to.address!,
				symbol: step.to.symbol,
				decimals: step.to.decimals,
				price_usd: step.to.usdPrice?.toString() ?? null,
				amount: step.toAmount,
				amount_usd: roundNumberByDecimals(
					new BigNumber(step.to.usdPrice!).times(new BigNumber(step.toAmount)).toString(),
					4,
				)!,
				logo_uri: step.to.logo,
			},
			chain: {
				id: rangoChainsMap[step.to.blockchain],
				logo_uri: `${config.CONCERO_ASSETS_URI}/icons/chains/filled/${rangoChainsMap[step.to.blockchain]}.svg`,
			},
			address: step.to.address,
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
