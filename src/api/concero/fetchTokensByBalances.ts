import { type Token } from './types'
import { config } from '../../constants/config'
import { get } from '../client'

export async function fetchTokensByBalances(
	chainId: string | undefined,
	walletAddress: string,
): Promise<Record<string, Token[]> | null> {
	try {
		if (!walletAddress) return null

		const url = `${config.baseURL}/balances?wallet_address=${walletAddress}${chainId ? `&chain_id=${chainId}` : ''}`
		const response = await get(url)

		if (response.status !== 200) return null

		return response.data.data
	} catch (error) {
		console.error(error)
		return null
	}
}
