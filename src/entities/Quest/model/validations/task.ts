import { z } from 'zod'
import { stepSchema } from './step'

export const taskTypeSchema = z.union([
	z.literal('progress_line'),
	z.literal('check_volume'),
	z.literal('check_count_tx'),
	z.literal('connect_discord'),
	z.literal('connect_x'),
	z.literal('connect_email'),
	z.literal('input'),
	z.literal('textarea'),
	z.literal('rate'),
	z.literal('google_form'),
	z.literal('like_x'),
])

export const taskSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1),
	description: z.string().min(1),
	is_required: z.boolean(),
	type: taskTypeSchema,
	steps: z.array(stepSchema).min(1),
})
