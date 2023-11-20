import { getOKXHeaders } from './getOkxHeaders'
import { get } from '../client'

export async function fetchOkxTokenAllowance(chainId: string, tokenAddress: string, walletAddress: string): Promise<string> {
	const baseUrl = `/api/v5/dex/aggregator/get-allowance?chainId=${chainId}&userWalletAddress=${walletAddress}&tokenContractAddress=${tokenAddress}`
	const url = 'https://www.okx.com' + baseUrl
	const headers = getOKXHeaders(baseUrl, 'GET')
	const response = await get(url, null, headers)
	return response.data.data[0].allowanceAmount
}
