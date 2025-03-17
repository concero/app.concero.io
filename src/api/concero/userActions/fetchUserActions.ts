import { get } from '../../client'
import { type IUserAction } from './userActionType'
import { TApiGetResponse, TPaginationParams } from '@/shared/types/api'

export const fetchUserActions = async (address: string, params: TPaginationParams) => {
	const url = `${process.env.CONCERO_API_URL}/userActions/${address}`

	const response = await get<TApiGetResponse<IUserAction[]>>(url, params)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
