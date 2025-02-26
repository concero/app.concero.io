import { get } from '../../client'
import { type Address } from 'viem'
import { type IUser } from './userType'
import { TApiResponse } from '@/types/api'
/**@deprecated */
export const fetchUserByAddress = async (address: Address) => {
	const url = `${process.env.CONCERO_API_URL}/users/${address}`

	const response = await get<TApiResponse<IUser>>(url)
	return response.data.data
}
