import { get } from '../../client'
import { type IQuest } from './questType'

export const fetchQuests = async (): Promise<IQuest[]> => {
	const url = `${process.env.CONCERO_API_URL}/quests`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
