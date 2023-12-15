import { IFetchOkxTxResponse, OKXRoute } from './types'
import { getOKXHeaders } from './getOkxHeaders'
import { get } from '../client'

export async function fetchOkxTx(route: OKXRoute, walletAddress: string, slippage: string, amount: string): Promise<IFetchOkxTxResponse[]> {
	const baseUrl = `/api/v5/dex/cross/chain/aggregator/build-tx?amount=${amount}&fromChainId=${route.fromChainId}&toChainId=${route.toChainId}&fromTokenAddress=${
		route.fromToken.tokenContractAddress
	}&toTokenAddress=${route.toToken.tokenContractAddress}&slippage=${Number(slippage) / 100}&userWalletAddress=${walletAddress}`
	const url = 'https://www.okx.com' + baseUrl
	const headers = getOKXHeaders(baseUrl, 'GET')
	const response = await get(url, null, headers)
	return response.data.data
}
