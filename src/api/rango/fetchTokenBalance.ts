import { get } from '../client'
import { config } from '../../constants/config'

export interface FetchBalanceResponse {
	status: number
	data: string
}

export const fetchTokenBalance = async (
	blockchain: string,
	tokenAddress: string,
	walletAddress: string,
	tokenSymbol: string,
): Promise<FetchBalanceResponse | null> => {
	try {
		const address = tokenAddress === config.NULL_ADDRESS ? '' : `&address=${tokenAddress}`
		const url = `https://api.rango.exchange/basic/token-balance?walletAddress=${walletAddress}&blockchain=${blockchain}&symbol=${tokenSymbol}${address}&apiKey=${process.env.RANGO_API_KEY}`
		const response = await get(url)
		if (response?.status !== 200) {
			console.error(`Error fetching balance for ${tokenSymbol} on ${blockchain} for address ${walletAddress}`)
			return null
		}
		return response
	} catch (error) {
		console.error(error)
		return null
	}
}
