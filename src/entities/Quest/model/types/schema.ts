import {
	// OnChainSourceZod,
	// SocialSourceZod,
	QuestCategoryZod,
	QuestTypeZod,
	// VerificationStatusZod,
	QuestSocialActionZod,
	QuestOnChainActionZod,
	QuestTestingActionZod,
	// QuestDateFilterZod,
} from '../validations/validations'
import { z } from 'zod'

// export type TOnChainSource = z.infer<typeof OnChainSourceZod>
// export type TSocialSource = z.infer<typeof SocialSourceZod>
export type TQuestCategory = z.infer<typeof QuestCategoryZod>
export type TQuestType = z.infer<typeof QuestTypeZod>
// export type TVerificationStatus = z.infer<typeof VerificationStatusZod>
export type TQuestSocialAction = z.infer<typeof QuestSocialActionZod>
export type TQuestOnChainAction = z.infer<typeof QuestOnChainActionZod>
export type TQuestTestingAction = z.infer<typeof QuestTestingActionZod>
export type TQuestActions = TQuestSocialAction | TQuestOnChainAction | TQuestTestingAction
// export type TQuestDateFilter = z.infer<typeof QuestDateFilterZod>

export type TQuestCardStatus = 'NOT_CONNECT' | 'READY_TO_START' | 'STARTED' | 'READY_TO_CLAIM' | 'FINISHED'
