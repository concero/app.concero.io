import { config } from '../../constants/config'
import { get } from '../client'

export type ConceroBalanceResponse = Record<string, Token[]>

export async function fetchBalancesByChainIds(
	chainIds: string[],
	walletAddress: string,
): Promise<ConceroBalanceResponse | null> {
	if (!walletAddress || !chainIds) return null
	try {
		const chainIdsString = chainIds.join(',')
		const url = `${config.baseURL}/balances?chain_id=${chainIdsString}&wallet_address=${walletAddress}`
		const response = await get(url)
		if (!response?.data?.success) return null
		return response.data.data
	} catch (error) {
		console.error(error)
		return null
	}
}
