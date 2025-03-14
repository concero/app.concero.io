import { TUserResponse } from '../types/response'

export const getCompletedStepsByQuest = (quest_id: string, user: TUserResponse) =>
	user.questsInProgress.find(quest => quest.questId === quest_id)?.completedSteps ?? []
