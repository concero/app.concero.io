import { get } from '../../client'
import { type Address } from 'viem'
import { type IUser } from './userType'

export const fetchUserByAddress = async (address: Address): Promise<IUser> => {
	const url = `${process.env.CONCERO_API_URL}/users/${address}`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
