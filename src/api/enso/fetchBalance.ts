import { type IFetchBalances } from './types'
import { get } from '../client'

export async function fetchBalances(address: string, chainId: string): Promise<IFetchBalances[]> {
	try {
		const url = `https://api.enso.finance/api/v1/wallet/balances?chainId=${chainId}&eoaAddress=${address}&useEoa=true`
		const response = await get(url)
		return response.data
	} catch (error) {
		console.error('error: ', error)
		return []
	}
}
