import type { Address } from 'viem'
import { get } from '../../client'
import { type IUserAction } from './userActionType'

export const fetchUserActions = async (address: Address): Promise<IUserAction[]> => {
	const url = `${process.env.CONCERO_API_URL}/userActions/${address}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}