import { get } from '../client'
import { type Chain } from '../../components/cards/SwapCard/types'

interface FetchChains {
	chainId?: string | null
	offset?: number
	limit?: number
	search?: string | null
	walletAddress?: string | null
}

export const fetchChains = async ({
	chainId = null,
	offset = 0,
	limit = 15,
	search = null,
	walletAddress = null,
}: FetchChains): Promise<Chain[]> => {
	const url = `${process.env.CONCERO_API_URL}/chains?offset=${offset}${limit ? `&limit=${limit}` : ''}${
		chainId ? `&id=${chainId}` : ''
	}${search ? `&search=${search}` : ''}&addressPatterns=^(0x)[0-9A-Fa-f]{40}$${
		walletAddress ? `&wallet_address=${walletAddress}` : ''
	}`
	const response = await get(url)
	if (response.status !== 200) throw new Error('no chains found')
	return response.data.data
}
