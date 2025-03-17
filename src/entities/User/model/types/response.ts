import { z } from 'zod'
import {
	// UserTierZod,
	// UserStreaksZod,
	// UserMultiplierZod,
	// UserConnectedSocialsZod,
	IUserZod,
} from '../validations/validations'

// export type TUserTier = z.infer<typeof UserTierZod>
// export type TUserStreak = z.infer<typeof UserStreaksZod>
// export type TUserMultiplaier = z.infer<typeof UserMultiplierZod>
// export type TUserConnectedSocials = z.infer<typeof UserConnectedSocialsZod>

export type TUserResponse = z.infer<typeof IUserZod>
export type TGetLeaderBoardReponse = {
	users: (TUserResponse & { position: number })[]
}

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
