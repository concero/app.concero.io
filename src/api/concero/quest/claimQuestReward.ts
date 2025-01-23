import { Address } from 'viem'
import { post } from '../../client'

export const claimQuestReward = async (
	questId: string,
	address: Address,
): Promise<{
	success: boolean
	points: number
}> => {
	const url = `${process.env.CONCERO_API_URL}/quests/claimReward`

	const response = await post(url, { address, questId })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
