import { config } from '../../constants/config'
import { get } from '../client'

export interface TokenBalance {
	symbol: string
	chainId: string
	address: string
	amount: string
	decimals: number
}
export type ConceroBalanceResponse = Record<string, TokenBalance[]>

export async function fetchBalancesByChainIds(chainIds: string[], walletAddress: string): Promise<ConceroBalanceResponse | null> {
	if (!walletAddress || !chainIds) return null
	try {
		const url = `${config.baseURL}/balances?chain_id=${chainIds.join(',')}&wallet_address=${walletAddress}`
		const response = await get(url)
		if (!response?.data?.success) return null
		return response.data.data
	} catch (error) {
		console.error(error)
		return null
	}
}
