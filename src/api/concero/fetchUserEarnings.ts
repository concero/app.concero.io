import type { Address } from 'viem'
import { get } from '../client'
import { type unstable_PatchRoutesOnMissFunction } from 'react-router-dom'

export interface UserEarnings {
	earnings: number
	percents: number
	deposit: number
	currentBalance: unstable_PatchRoutesOnMissFunction
}

export const fetchUserEarnings = async (address: Address): Promise<UserEarnings> => {
	const url = `${process.env.CONCERO_API_URL}/userPoolEarnings?address=${address}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('No transactions found')
	return response.data.data
}
