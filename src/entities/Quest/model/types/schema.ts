import { z } from 'zod'
import { questCategorySchema, questGroupSchema, questIntervalSchema, questSizeSchema } from '../validations/validations'
import { taskTypeSchema } from '../validations/task'

export type TQuestCategory = z.infer<typeof questCategorySchema>
// export type TQuestType = z.infer<typeof QuestTypeZod>
// export type TQuestSocialAction = z.infer<typeof QuestSocialActionZod>
// export type TQuestOnChainAction = z.infer<typeof QuestOnChainActionZod>
// export type TQuestTestingAction = z.infer<typeof QuestTestingActionZod>
export type TQuestTaskAction = z.infer<typeof taskTypeSchema>

export type TQuestInterval = z.infer<typeof questIntervalSchema>
export type TQuestCardStatus = 'NOT_CONNECT' | 'READY_TO_START' | 'STARTED' | 'READY_TO_CLAIM' | 'FINISHED'
export type TQuestSize = z.infer<typeof questSizeSchema>
export type TTagQuest = z.infer<typeof questGroupSchema>
