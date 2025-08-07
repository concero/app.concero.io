import { z } from 'zod'
import { blockerSchema } from './blocker'
import { rewardSchema } from '@/entities/Reward'

export const stepDetailsSchema = z.object({
	fromChainIds: z.array(z.number().int()).optional(),
	toChainIds: z.array(z.number().int()).optional(),
	isTestnet: z.boolean().optional(),
	isCrossChain: z.boolean().optional(),
	link: z.string().url().optional(),
	value: z.string().optional(),
})
export const stepSchema = z.object({
	id: z.string().uuid(),
	sort_index: z.number().int().nonnegative(),
	blocker: blockerSchema.nullable(),
	reward: rewardSchema.nullable(),
	details: stepDetailsSchema,
})
