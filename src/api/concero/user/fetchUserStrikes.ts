import type { Address } from 'viem'
import { get } from '../../client'

export interface UserStreaks {
	dailySwapStreak: number
	lpHoldingStreak: number
}

export const getUserStreaks = async (address: Address): Promise<UserStreaks> => {
	const url = `${process.env.CONCERO_API_URL}/getUserStreaks/${address}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
