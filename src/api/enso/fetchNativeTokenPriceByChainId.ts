import { get } from '../client'

export async function fetchNativeTokenPriceByChainId(chainId: string | number): Promise<number> {
	const url = `https://api.enso.finance/api/v1/prices/${chainId}/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`
	const response = await get(url)
	return response?.data?.price
}
