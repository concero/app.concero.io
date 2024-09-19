import type { IUser } from './userType'
import { post } from '../../client'
import { type QuestStatus } from '../../../components/rewards/Quests/QuestModal/questVerifier'

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
	userId: string,
): Promise<{
	status: QuestStatus
	points: number | null
	discordRewardsMessage?: string
	communityRewardsMessage?: string
}> => {
	const url = `${process.env.CONCERO_API_URL}/quests/verify`

	const response = await post(url, { userId, questId })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
