import type { IUser } from './userType'
import { post } from '../../client'

export const updateUserDiscord = async (data: any): Promise<IUser> => {
	const url = `${process.env.CONCERO_API_URL}/connectNetwork/discord`

	const response = await post(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}

export const updateUserTwitter = async (data: any): Promise<IUser> => {
	const url = `${process.env.CONCERO_API_URL}/connectNetwork/twitter`

	const response = await post(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
