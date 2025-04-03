import {
	QuestCategoryZod,
	QuestTypeZod,
	QuestSocialActionZod,
	QuestOnChainActionZod,
	QuestTestingActionZod,
	questSizes,
	questTags,
} from '../validations/validations'
import { z } from 'zod'

export type TQuestCategory = z.infer<typeof QuestCategoryZod>
export type TQuestType = z.infer<typeof QuestTypeZod>
export type TQuestSocialAction = z.infer<typeof QuestSocialActionZod>
export type TQuestOnChainAction = z.infer<typeof QuestOnChainActionZod>
export type TQuestTestingAction = z.infer<typeof QuestTestingActionZod>
export type TQuestActions = TQuestSocialAction | TQuestOnChainAction | TQuestTestingAction
export type TQuestCardStatus = 'NOT_CONNECT' | 'READY_TO_START' | 'STARTED' | 'READY_TO_CLAIM' | 'FINISHED'
export type TQuestSize = (typeof questSizes)[number]
export type TTagQuest = (typeof questTags)[number]
