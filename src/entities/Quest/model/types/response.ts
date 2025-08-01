import { z } from 'zod'

import { TPaginationResponse } from '@/shared/types/api'
import { questSchema } from '../validations/validations'
import { stepSchema } from '../validations/step'

export type TVerifyResponse = { success: boolean; status: boolean }
export type TClaimResponse = {
	success: boolean
	points: number
}
export type TQuest = z.infer<typeof questSchema>
// export type TGetQuestsResponse = Partial<Record<TQuestType, TQuest[]>>
export type TGetAllQuestsResponse = {
	quests: TQuest[]
	pagination: TPaginationResponse
}
export type TQuestStep = z.infer<typeof stepSchema>
export type TQuestTag = TQuest['group']
