import { TUserResponse } from '@/entities/User/model/types/response'

export const getIsClaimedQuest = (quest_id: string, user?: TUserResponse) =>
	user?.completedQuests.hasOwnProperty(quest_id.toString()) ?? false
