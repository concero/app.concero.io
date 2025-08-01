import { z } from 'zod'

// Base types
const IdSchema = z.string().min(1)
const TimestampSchema = z.number().int().nonnegative()
const UserCERsSchema = z.number().nullable()
export const UserActionTypeSchema = z.union([
	z.literal('swap'),
	z.literal('bridge'),
	z.literal('x_connected'),
	z.literal('x_disconnected'),
	z.literal('discord_connected'),
	z.literal('discord_disconnected'),
	z.literal('quest_step_completed'),
	z.literal('quest_completed'),
	z.literal('special_reward_applied'),
])

// DTO Schemas
export const UserActionQuestDataSchema = z.object({
	name: z.string().min(1),
})

export const UserActionSpecialRewardDataSchema = z.object({
	name: z.string().min(1),
})

const UserActionTxFromToDataSchema = z.object({
	chainName: z.string().min(1),
	chainId: z.number().int(),
	tokenSymbol: z.string().min(1),
	amount: z.number(),
})

export const UserActionTxDataSchema = z.object({
	isTestnet: z.boolean(),
	from: UserActionTxFromToDataSchema,
	to: UserActionTxFromToDataSchema,
})

const UserActionDataSchema = z
	.union([UserActionQuestDataSchema, UserActionTxDataSchema, UserActionSpecialRewardDataSchema])
	.nullable()

export const UserActionSchema = z.object({
	type: UserActionTypeSchema,
	executedAt: TimestampSchema,
	referenceId: IdSchema,
	points: UserCERsSchema,
	data: UserActionDataSchema,
})
