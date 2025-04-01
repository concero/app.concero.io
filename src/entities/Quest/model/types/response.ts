import { z } from 'zod'
import { TQuestType } from './schema'
import { IQuestStepZod, IQuestZod } from '../validations/validations'

export type TVerifyResponse = { success: boolean; status: boolean }
export type TClaimResponse = {
	success: boolean
	points: number
}
export type TQuest = z.infer<typeof IQuestZod>
export type TGetQuestsResponse = Partial<Record<TQuestType, TQuest[]>>
export type TGetAllQuestsResponse = TQuest[]
export type TQuestStep = z.infer<typeof IQuestStepZod>
export type TQuestTag = TQuest['tag']
