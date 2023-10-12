import { get } from '../client'

interface IResponse {
	confidence: number
	decimals: number
	price: number
	symbol: string
	timestamp: number
}

export async function fetchTokenPrice(chainId: string | number, address: string): Promise<IResponse> {
	const url = `https://api.enso.finance/api/v1/prices/${chainId}/${address}`
	const response = await get(url)
	return response?.data ?? null
}
