import { get } from '../client'
import { type GetTokensParams } from '../../hooks/DataContext/types'

export const fetchTokens = async ({ chainId, offset, limit, search }: GetTokensParams) => {
	const chainIdQuery = chainId ? `?chain_id=${chainId}` : ''
	const offsetQuery = chainId ? `?chain_id=${chainId}` : ''
	const limitQuery = chainId ? `?chain_id=${chainId}` : ''
	const searchQuery = search ? `&search=${search}` : ''

	const url = `${process.env.CONCERO_API_URL}/tokens?${chainIdQuery}${offsetQuery}${limitQuery}${searchQuery}`

	const response = await get(url)
	if (response.status !== 200) throw new Error(response.statusText)
	return response.data.data
}
