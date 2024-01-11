import { rangoClient } from './rangoClient'
import { config } from '../../constants/config'
import { standardizeRangoBestRoute } from './standardizeRangoBestRoute'
import { type Direction, type StandardRoute } from '../../types/StandardRoute'
import { type Settings } from '../../components/cards/SwapCard/swapReducer/types'
import { type BestRouteRequest } from 'rango-sdk/src/types'

interface IFetchRangoRoutes {
	from: Direction
	to: Direction
	settings: Settings
}

export const fetchRangoRoutes = async ({ from, to, settings }: IFetchRangoRoutes): Promise<[StandardRoute] | []> => {
	const fromRangoChainSymbol = from.chain.providers?.find(item => item.name === 'rango')?.symbol
	const toRangoChainSymbol = to.chain.providers?.find(item => item.name === 'rango')?.symbol

	if (fromRangoChainSymbol === undefined || toRangoChainSymbol === undefined) return []

	const quoteParams: BestRouteRequest = {
		from: {
			blockchain: fromRangoChainSymbol,
			symbol: from.token.symbol,
			address: from.token.address === config.NULL_ADDRESS ? null : from.token.address,
		},
		to: {
			blockchain: toRangoChainSymbol,
			symbol: to.token.symbol,
			address: to.token.address === config.NULL_ADDRESS ? null : to.token.address,
		},
		amount: from.amount!,
		checkPrerequisites: true,
		connectedWallets: [],
		selectedWallets: { [fromRangoChainSymbol]: from.address!, [toRangoChainSymbol]: from.address! },
		affiliateRef: process.env.RANGO_AFFILIATE_REF,
		affiliatePercent: Number(process.env.RANGO_AFFILIATE_PERCENTAGE),
		slippage: settings.slippage_percent,
		disableMultiStepTx: !settings.allowSwitchChain,
	}

	const route = await rangoClient.getBestRoute(quoteParams)

	if (!route?.result) return []

	return [await standardizeRangoBestRoute(route, from, to)]
}
