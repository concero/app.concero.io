import { TApiGetResponse } from '../../../types/utils'
import { get } from '../../client'
import { type IUserAction } from './userActionType'

export const fetchUserActions = async (address: string): Promise<IUserAction[]> => {
	const url = `${process.env.CONCERO_API_URL}/userActions/${address}`

	const response = await get<TApiGetResponse<IUserAction[]>>(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
