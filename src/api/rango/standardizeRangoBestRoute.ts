import { Direction, StandardRoute } from '../lifi/types'
import { BestRouteResponse } from 'rango-types/src/api/main/routing'
import BigNumber from 'bignumber.js'
import { standardizeRangoBestRouteStep } from './standardizeRangoBestRouteStep'
import { SwapFee, SwapResult } from 'rango-types/src/api/main/common'
import { roundNumberByDecimals } from '../../utils/formatting'
import { Step } from 'types'

export async function standardizeRangoBestRoute(route: BestRouteResponse, from: Direction, to: Direction): Promise<StandardRoute> {
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
		},
		to: {
			token: {
				name: route.to.symbol,
				address: route.to.address,
				symbol: route.to.symbol,
				decimals: to.token.decimals,
				amount: roundNumberByDecimals(route.result?.outputAmount, 4),
				amount_usd: new BigNumber(route.result?.outputAmount ?? 0).times(route.result?.swaps.pop()?.to.usdPrice ?? 0).toString(),
			},
			chain: {
				id: route.to.blockchain,
			},
		},
		steps:
			route.result?.swaps.flatMap<Step>((route: SwapResult): Step[] => route.internalSwaps?.map<Step>((swap: SwapResult): Step => standardizeRangoBestRouteStep(swap)) ?? []) ?? null,
		cost: {
			total_usd: null,
			total_gas_usd: roundNumberByDecimals(
				new BigNumber(
					route.result?.swaps.reduce<number>(
						(res: number, swap: SwapResult): number =>
							(swap.internalSwaps?.reduce<number>(
								(innerSwapRes: number, innerSwap: SwapResult): number =>
									innerSwap.fee.reduce<number>((feeRes: number, feeItem: SwapFee): number => parseFloat(feeItem.amount) + feeRes, 0) + innerSwapRes,
								0,
							) ?? 0) + res,
						0,
					) ?? 0,
				)
					.times(route.result?.swaps[0]?.from.usdPrice ?? 0)
					.toString(),
				2,
			),
		},
		tags: [],
		slippage_percent: null,
		transaction_time_seconds: route.result?.swaps.reduce<number>((result: number, item: SwapResult): number => result + item.estimatedTimeInSeconds, 0) ?? null,
		originalRoute: route,
	}
}
