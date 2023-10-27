import { get } from '../client'
import { config } from '../../constants/config'

export interface Balances {
	amount: {
		amount: string
		decimals: number
	}
	asset: {
		address: string
		blockchain: number
		symbol: string
	}
}

export async function fetchBalancesByRangoChainSymbol(rangoChainSymbol: string, walletAddress: string): Promise<Balances | null> {
	if (!walletAddress || !rangoChainSymbol) return null

	const url = `https://api.rango.exchange/basic/balance?blockchain=${rangoChainSymbol}&address=${walletAddress}&apiKey=${config.RANGO_API_KEY}`
	const response = await get(url)

	if (response.status !== 200) return null

	return response.data.wallets[0].balances
}
