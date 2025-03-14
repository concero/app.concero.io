import { Address } from 'viem'
import { post } from '../../client'
/**@deprecated */
export const verifyQuest = async (
	questId: string,
	stepId: string,
	address: Address,
): Promise<{
	success: boolean
	status: boolean
}> => {
	const url = `${process.env.CONCERO_API_URL}/quests/verify`

	const response = await post(url, { address, questId, stepId })
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data
}
