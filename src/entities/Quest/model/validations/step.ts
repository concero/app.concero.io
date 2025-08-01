import { z } from 'zod'
import { blockerSchema } from './blocker'
import { rewardSchema } from '@/entities/Reward'

export const stepDetailsSchema = z
	.object({
		link: z.string().url().optional(),
		chainIds: z.array(z.number().int()).optional(),
	})
	.refine(data => 'link' in data || 'chainIds' in data, {
		message: 'Either "link" or "chainIds" must be provided',
	})
export const stepSchema = z.object({
	id: z.string().uuid(),
	sort_index: z.number().int().nonnegative(),
	blocker: blockerSchema.nullable(),
	reward: rewardSchema.nullable(),
	details: stepDetailsSchema,
})
