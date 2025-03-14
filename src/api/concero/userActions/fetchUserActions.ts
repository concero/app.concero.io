import { TApiResponse } from '@/types/api'
import { get } from '../../client'
import { type IUserAction } from './userActionType'

export const fetchUserActions = async (address: string) => {
	const url = `${process.env.CONCERO_API_URL}/userActions/${address}`

	const response = await get<TApiResponse<IUserAction[]>>(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
