import { TPaginationParams } from '../../../types/api'
import { TApiGetResponse } from '../../../types/utils'
import { get } from '../../client'
import { type IUserAction } from './userActionType'

export const fetchUserActions = async (address: string, { page, limit }: TPaginationParams) => {
	const url = `${process.env.CONCERO_API_URL}/userActions/${address}`

	const response = await get<TApiGetResponse<IUserAction[]>>(url, {
		page,
		limit,
	})
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
