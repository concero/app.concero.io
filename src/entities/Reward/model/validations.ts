import { z } from 'zod'

export const customRewardSchema = z.object({
	details: z.string(),
})

export const tokenRewardSchema = z.object({
	max_value: z.number().positive(),
	min_value: z.number().nonnegative(),
})

export const roleSchema = z.object({
	name: z.string(),
	original_id: z.string(),
})

export const RewardTypeSchema = z.union([z.literal('CUSTOM'), z.literal('ROLE'), z.literal('TOKEN')])

export const rewardSchema = z.object({
	id: z.string().uuid(),
	type: RewardTypeSchema,
	customReward: customRewardSchema.nullable(),
	roleReward: roleSchema.nullable(),
	tokenReward: tokenRewardSchema.nullable(),
})
