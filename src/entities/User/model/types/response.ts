import { z } from 'zod'
import { UserSchema, UserSocialSchema, UserSocialTypeSchema } from '../validations/validations'
import { UserLeaderboardResponseSchema } from '../validations/leaderboard'
import { OmitTyped } from '@/shared/types/utils'
import {
	UserActionQuestDataSchema,
	UserActionSchema,
	UserActionSpecialRewardDataSchema,
	UserActionTxDataSchema,
	UserActionTypeSchema,
} from '../validations/user-action'
import { TPaginationResponse } from '@/shared/types/api'

export type TUserResponse = z.infer<typeof UserSchema>
export type TUserSocial = z.infer<typeof UserSocialSchema>
export type TUserSocialType = z.infer<typeof UserSocialTypeSchema>
export type TGetLeaderBoardReponse = z.infer<typeof UserLeaderboardResponseSchema>

// Socials
export type TUpdateUserDiscord = {
	success: boolean
	message: string
	username: string
}
export type TUpdateUserTwitter = {
	success: boolean
	message: string
	username: string
}

export type TUserActionType = z.infer<typeof UserActionTypeSchema>
export type TUserActionQuestData = z.infer<typeof UserActionQuestDataSchema>
export type TUserActionSpecialRewardData = z.infer<typeof UserActionSpecialRewardDataSchema>
export type TUserActionTxData = z.infer<typeof UserActionTxDataSchema>

export type TUserAction = z.infer<typeof UserActionSchema>
export type TUserActionResponse = {
	actions: TUserAction[]
	pagination: TPaginationResponse
}
export const enum NicknameError {
	Short = 'Short',
	Long = 'Long',
	Invalid = 'Invalid',
	Exists = 'Exists',
	Error = 'Error',
}
export type TUserNicknameCheckResponse = {
	user: OmitTyped<TUserResponse, 'multiplier' | 'streak'>
}
export interface UserEarnings {
	earnings: number
	percents: number
	deposit: number
}
