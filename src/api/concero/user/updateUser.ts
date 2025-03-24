import { TUserResponse } from '@/entities/User'
import { post } from '../../client'
/**@deprecated */
export const updateUserDiscord = async (data: any): Promise<TUserResponse> => {
	const url = `${process.env.CONCERO_API_URL}/connectNetwork/discord`

	const response = await post(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
/**@deprecated */
export const updateUserTwitter = async (data: any): Promise<TUserResponse> => {
	const url = `${process.env.CONCERO_API_URL}/connectNetwork/twitter`

	const response = await post(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
