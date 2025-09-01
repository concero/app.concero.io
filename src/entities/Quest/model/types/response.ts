import { z } from 'zod'

import { TPaginationResponse } from '@/shared/types/api'
import { questCategorySchema, questIntervalSchema, questSchema, questSizeSchema } from '../validations/validations'
import { stepSchema } from '../validations/step'
import { userQuestSchema } from '../validations/userQuest'
import { taskSchema, taskTypeSchema } from '../validations/task'
import { userStepSchema } from '../validations/userStep'

export type TVerifyResponse = { success: boolean; status: boolean }
export type TClaimResponse = {
	success: boolean
	points: number
}
export type TQuest = z.infer<typeof questSchema>
export type TGetAllQuestsResponse = {
	quests: TQuest[]
	pagination: TPaginationResponse
}
export type TQuestSize = z.infer<typeof questSizeSchema>
export type TQuestStep = z.infer<typeof stepSchema>
export type TQuestTask = z.infer<typeof taskSchema>
/**@deprecated */
export type TQuestTag = TQuest['group']
export type TQuestGroup = TQuest['group']
export type TQuestCategory = z.infer<typeof questCategorySchema>
export type TQuestInterval = z.infer<typeof questIntervalSchema>
export type TUserQuest = z.infer<typeof userQuestSchema>
export type TUserStep = z.infer<typeof userStepSchema>
export type TUserQuestResponse = {
	userQuests: TUserQuest[]
	pagination: TPaginationResponse
}

export type TTaskType = z.infer<typeof taskTypeSchema>
