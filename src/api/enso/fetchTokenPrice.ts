import { get } from '../client'

export async function fetchTokenPrice(chainId: string | number, address: string): Promise<number> {
	const url = `https://api.enso.finance/api/v1/prices/${chainId}/${address}`
	const response = await get(url)
	return response?.data?.price ?? null
}
