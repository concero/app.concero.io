import { type Fees, type StandardRoute, type Step } from '../../types/StandardRoute'
import { type BestRouteResponse } from 'rango-types/src/api/main/routing'
import BigNumber from 'bignumber.js'
import { type SwapFee, type SwapResult } from 'rango-types/src/api/main/common'
import { roundNumberByDecimals } from '../../utils/formatting'
import { standardizeRangoBestRouteStep } from './standardizeRangoBestRouteStep'
import { config } from '../../constants/config'

function getSteps(route: BestRouteResponse): Step[] | null {
	const steps = route.result?.swaps.map((swap: SwapResult) => standardizeRangoBestRouteStep(swap)) ?? null
	return steps ?? null
}

function getTotalGasUsd(route: BestRouteResponse): string | null {
	const reduceSwaps = (res: number, swap: SwapResult): number => swap.fee.reduce((feeRes: number, feeItem: SwapFee): number => parseFloat(feeItem.amount) + feeRes, 0) + res
	return roundNumberByDecimals(new BigNumber(route.result?.swaps.reduce(reduceSwaps, 0) ?? 0).times(route.result?.swaps[0]?.from.usdPrice ?? 0).toString(), 2)
}

function getTotalFee(route: BestRouteResponse): Fees[] | [] {
	const result: Fees[] = []

	route.result?.swaps.forEach((swap: SwapResult) => {
		swap.fee.forEach((feeItem: SwapFee) => {
			const feeIndex = result.findIndex((item: Fees): boolean => item.asset.symbol === feeItem.asset.symbol)
			if (feeIndex === -1) {
				result.push({
					amount: feeItem.amount,
					asset: {
						chainId: swap.from.blockchain,
						symbol: feeItem.asset.symbol,
						address: feeItem.asset.address ?? config.NULL_ADDRESS,
					},
				})
			} else {
				result[feeIndex].amount = new BigNumber(result[feeIndex].amount).plus(feeItem.amount).toString()
			}
		})
	})

	return result
}

export async function standardizeRangoBestRoute(route: BestRouteResponse, from: any, to: any): Promise<StandardRoute> {
	return {
		id: route.requestId,
		provider: 'rango',
		from: {
			token: {
				name: route.from.symbol,
				address: route.from.address,
				symbol: route.from.symbol,
				decimals: from.token.decimals,
				amount: from.amount,
				amount_usd: from.amount_usd,
			},
			chain: {
				id: route.from.blockchain,
			},
			address: from.address,
		},
		to: {
			token: {
				name: route.to.symbol,
				address: route.to.address,
				symbol: route.to.symbol,
				decimals: to.token.decimals,
				amount: roundNumberByDecimals(route.result?.outputAmount, 4),
				amount_usd: new BigNumber(route.result?.outputAmount ?? 0).times(route.result?.swaps[route.result.swaps.length - 1]?.to.usdPrice ?? 0).toString(),
			},
			chain: {
				id: route.to.blockchain,
			},
			address: to.address,
		},
		steps: getSteps(route),
		cost: {
			total_usd: null,
			total_gas_usd: null,
			total_fee: getTotalFee(route),
		},
		tags: [],
		slippage_percent: null,
		transaction_time_seconds: route.result?.swaps.reduce((result: number, item: SwapResult): number => result + item.estimatedTimeInSeconds, 0) ?? null,
		originalRoute: route,
	}
}
