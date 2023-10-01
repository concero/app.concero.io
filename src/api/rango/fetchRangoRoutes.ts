import { rangoClient } from './rangoClient'
import { config } from '../../constants/config'
import { standardizeRangoBestRoute } from './standardizeRangoBestRoute'

export const fetchRangoRoutes = async ({ from, to, settings }) => {
	// todo: how to control rango slippage?

	const fromRangoChainSymbol = from.chain.providers?.find(item => item.name === 'rango')?.symbol
	const toRangoChainSymbol = to.chain.providers?.find(item => item.name === 'rango')?.symbol

	if (fromRangoChainSymbol === undefined || toRangoChainSymbol === undefined) return []

	const quoteParams = {
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
		amount: from.amount,
		checkPrerequisites: true,
		connectedWallets: [],
		selectedWallets: { [fromRangoChainSymbol]: from.address, [toRangoChainSymbol]: from.address },
	}

	console.log('quoteParams', quoteParams)

	const route = await rangoClient.getBestRoute(quoteParams)
	console.log('rango original route', route)

	return route ? [await standardizeRangoBestRoute(route, from, to)] : []
}
