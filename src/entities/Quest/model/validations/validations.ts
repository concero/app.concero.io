import { rewardSchema } from '@/entities/Reward'
import { z } from 'zod'
import { blockerSchema } from './blocker'
import { taskSchema } from './task'

export const questGroupSchema = z.union([z.literal('testing'), z.literal('rewards')])

export const questCategorySchema = z.union([
	z.literal('Socials'),
	z.literal('OnChain'),
	z.literal('Common'),
	z.literal('Lanca'),
	z.literal('Testnet'),
])

export const questIntervalSchema = z.union([
	z.literal('single'),
	z.literal('daily'),
	z.literal('weekly'),
	z.literal('monthly'),
	z.literal('yearly'),
])

export const questSizeSchema = z.union([z.literal('s'), z.literal('m'), z.literal('l'), z.literal('xl')])

export const questSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1),
	subtitle: z.string().nullable(),
	description: z.string().nullable(),
	image: z.string().url().nullable(),
	group: questGroupSchema,
	category: questCategorySchema,
	interval: questIntervalSchema,
	lifetime: z.number().int().positive().nullable(),
	is_new: z.boolean(),
	size: questSizeSchema,
	sort_index: z.number().int().nonnegative(),
	quest_reward: rewardSchema,
	blocker: blockerSchema.nullable(),
	tasks: z.array(taskSchema).min(1),
	questInstanceId: z.string(),
	started_at: z.number(),
	finished_at: z.number(),
})
