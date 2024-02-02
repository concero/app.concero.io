import { get } from '../client'
import { type GetTokensParams } from '../../hooks/DataContext/types'

export const fetchTokens = async ({ chainId, offset, limit, search }: GetTokensParams) => {
	const url = `${process.env.CONCERO_API_URL}/tokens/?chain_id=${chainId}&offset=${offset}&limit=${limit}${
		search ? `&search=${search}` : ''
	}`

	const response = await get(url)
	if (response.status !== 200) throw new Error(response.statusText)
	return response.data.data
}
