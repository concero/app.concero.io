import { get } from '../../client'
import { type IQuest } from './questType'

export const fetchQuests = async (): Promise<IQuest[]> => {
	const url = `${process.env.CONCERO_API_URL}/quests`

	// const token = process.env.QUESTS_AUTH_TOKEN
	//
	// const response = await get(url, {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// })

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
