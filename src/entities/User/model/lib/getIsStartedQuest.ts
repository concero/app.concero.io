import { TQuest } from '@/entities/Quest'
import { TUserResponse } from '../types/response'

export const getIsStartedQuest = (quest_id: TQuest['id'], user: TUserResponse) => {
	return user.questsInProgress.some(quest => quest.questId === quest_id)
}
