import type { IUser } from './userType'
import { post } from '../../client'

export const updateUserDiscord = async (data: any): Promise<IUser> => {
	const url = `${process.env.CONCERO_API_URL}/connect/discord`

	const response = await post(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}

export const updateUserTwitter = async (data: any): Promise<IUser> => {
	const url = `${process.env.CONCERO_API_URL}/connect/twitter`

	const response = await post(url, data)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}

export const verifyUserQuest = async (
	questId: string,
	stepId: string,
	userId: string,
): Promise<{
	success: boolean
	status: boolean
}> => {
	const url = `${process.env.CONCERO_API_URL}/quests/verify`

	const response = await post(url, { userId, questId, stepId })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
