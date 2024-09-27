import { post } from '../../client'

export const verifyQuest = async (
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
