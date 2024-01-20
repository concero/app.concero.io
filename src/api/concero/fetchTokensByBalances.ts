import { type Token } from './types'
import { config } from '../../constants/config'
import { get } from '../client'

export async function fetchTokensByBalances(chainId: string, walletAddress: string): Promise<Token[] | null> {
	try {
		if (!chainId || !walletAddress) return null

		const url = `${config.baseURL}/balances?wallet_address=${walletAddress}&chain_id=${chainId}`
		const response = await get(url)

		if (response.status !== 200) return null

		return response.data.data
	} catch (error) {
		console.error(error)
		return null
	}
}
