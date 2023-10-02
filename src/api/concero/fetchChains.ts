import { get } from '../client'
import { Chain } from './types'

export const fetchChains = async ({
	chainId = null,
	offset = 0,
	limit = 15,
	search = null,
}: {
	chainId: string | null
	offset: number
	limit: number
	search: string | null
}): Promise<Chain[]> => {
	const url = `${process.env.CONCERO_API_URL}/chains?offset=${offset}${limit ? `&limit=${limit}` : ''}${chainId ? `&chainId=${chainId}` : ''}${search ? `&search=${search}` : ''}`
	const response = await get(url)
	if (response.status !== 200) throw new Error('no chains found')
	return response.data.data
}
