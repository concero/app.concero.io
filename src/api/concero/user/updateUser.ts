import type { IUser } from '../userType'
import { patch } from '../../client'

export const updateUser = async (userId: string, data: any): Promise<IUser> => {
	const url = `${process.env.CONCERO_API_URL}/users/${userId}`

	const response = await patch(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
