import { Nullable } from '@/shared/types/zod/utility'
import { z } from 'zod'

export enum UserSocialType {
	X = 'x',
	Discord = 'discord',
}

const UserSocialTypeSchema = z.union([z.literal(UserSocialType.X), z.literal(UserSocialType.Discord)])

export const UserSocialSchema = z.object({
	id: z.string(),
	type: UserSocialTypeSchema,
	name: z.string(),
	shortname: z.string(),
	originalId: z.string(),
	connectedAt: z.number().int().nonnegative(), // timestamp in seconds
	disconnectedAt: Nullable(z.number().int().nonnegative()),
})

export const UserDetailsThemeVariantSchema = z.enum(['light', 'dark', 'system'])

export const UserDetailsSchema = z.object({
	termsOfUseSignedVersion: z.string().nullable(),
	uiThemeVariant: UserDetailsThemeVariantSchema.nullable(),
})
const UserMultiplierFieldSchema = z.number().min(1).optional()

const UserMultiplierSchema = z.object({
	base: UserMultiplierFieldSchema,
	liquidity_pool: UserMultiplierFieldSchema,
	daily_swap: UserMultiplierFieldSchema,
})

const UserStreakFieldSchema = z.number().min(1)
const UserStreakSchema = z.object({
	liquidity_pool: UserStreakFieldSchema.optional(),
	daily_swap: UserStreakFieldSchema.optional(),
})
export const UserSchema = z.object({
	id: z.string(),
	address: z.string(),
	locale: z.string(),
	timezone: z.string(),
	nickname: z.string().nullable(),
	points: z.number(),
	email: z.string().nullable(),
	emailVerifiedAt: z.number().nullable(),
	multiplier: UserMultiplierSchema,
	streak: UserStreakSchema,
	details: UserDetailsSchema,
})
