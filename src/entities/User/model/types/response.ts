import { z } from 'zod'
import { type Hash } from 'viem'
import {
	// UserTierZod,
	// UserStreaksZod,
	// UserMultiplierZod,
	// UserConnectedSocialsZod,
	IUserZod,
	UserConnectedSocialsZod,
} from '../validations/validations'

// export type TUserTier = z.infer<typeof UserTierZod>
// export type TUserStreak = z.infer<typeof UserStreaksZod>
// export type TUserMultiplaier = z.infer<typeof UserMultiplierZod>
// export type TUserConnectedSocials = z.infer<typeof UserConnectedSocialsZod>

export type TUserResponse = z.infer<typeof IUserZod>
type ConnectedSocials = z.infer<typeof UserConnectedSocialsZod>
type NonNullableConnectedSocials = Exclude<ConnectedSocials, null>
export type TUserSocialNetworkType = keyof NonNullableConnectedSocials
export type TGetLeaderBoardReponse = {
	users: (TUserResponse & { position: number })[]
}

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

// User actions
export enum TransactionType {
	ConceroSwapTx = 'ConceroSwapTx',
	ConceroBridgeTx = 'ConceroBridgeTx',
}

export enum EActionType {
	'transactionReward',
	'questReward',
	'specialReward',
}

export interface UserActionTxData {
	type: TransactionType
	from: {
		chainName: string
		tokenSymbol: string
		amount: number
	}
	to: {
		chainName: string
		tokenSymbol: string
		amount: number
	}
	txHash: Hash
}

export interface UserActionQuestData {
	name: string
	points?: number
	multiplier?: number
	timestamp: number
	completedQuestStepIds?: number[]
	isCompleted?: boolean
}

export interface IUserAction {
	userAddress: string
	documentId: string
	actionType: EActionType
	points?: number
	multiplier?: number
	timestamp: number
	data: UserActionTxData | UserActionQuestData
}
export const enum NicknameError {
	Short = 'Short',
	Long = 'Long',
	Invalid = 'Invalid',
	Exists = 'Exists',
	Error = 'Error',
}
