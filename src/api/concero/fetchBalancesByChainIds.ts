import { config } from '../../constants/config'
import { get } from '../client'
import { trackEvent } from '../../hooks/useTracking'
import { action, category } from '../../constants/tracking'

export interface TokenBalance {
	symbol: string
	chainId: string
	address: string
	amount: string
	decimals: number
}
export type ConceroBalanceResponse = { [key: string]: TokenBalance[] }

export async function fetchBalancesByChainIds(chainIds: string[], walletAddress: string): Promise<ConceroBalanceResponse | null> {
	if (!walletAddress || !chainIds) return null
	try {
		const url = `${config.baseURL}/balances?chain_id=${chainIds.join(',')}&wallet_address=${walletAddress}`
		const response = await get(url)
		if (!response?.data?.success) return null
		return response.data.data
	} catch (error) {
		console.error(error)
		trackEvent({
			category: category.API,
			action: action.APIError,
			label: 'API Error',
			data: { error },
		})
		return null
	}
}
