import { IFetchOkxTransactionStatus } from './types'
import { getOKXHeaders } from './getOkxHeaders'
import { get } from '../client'

export async function fetchOkxTransactionStatus(hash: string): Promise<IFetchOkxTransactionStatus> {
	console.log('fetchOkxTransactionStatus hash: ', hash)
	const baseUrl = `/api/v5/dex/cross/chain/aggregator/status?hash=${hash}`
	const url = 'https://www.okx.com' + baseUrl
	const headers = getOKXHeaders(baseUrl, 'GET')
	const response = await get(url, null, headers)
	console.log('fetchOkxTransactionStatus response: ', response)
	return response.data.data[0]
}
