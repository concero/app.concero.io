import { get } from '../../client'
import { type IQuest, type QuestType } from './questType'
/**@deprecated */
export type GroupedQuests = Record<QuestType, IQuest[]>
/**@deprecated */
export const fetchQuests = async (): Promise<GroupedQuests> => {
	const url = `${process.env.CONCERO_API_URL}/quests`

	const response = await get(url)
	if (response.status !== 200) throw new Error('Something went wrong')
	return response.data.data
}
