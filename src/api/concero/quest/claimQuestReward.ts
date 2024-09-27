import { post } from '../../client'

export const claimQuestReward = async (
	questId: string,
	userId: string,
): Promise<{
	success: boolean
	status: boolean
}> => {
	const url = `${process.env.CONCERO_API_URL}/quests/claimReward`

	const response = await post(url, { userId, questId })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
