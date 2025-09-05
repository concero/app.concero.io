import { z } from 'zod'
import { userStepSchema } from './userStep'

export const userQuestSchema = z.object({
	id: z.string().uuid(),
	questId: z.string().uuid(),
	questInstanceId: z.string().uuid(),
	started_at: z.number().int().nonnegative(),
	finished_at: z.number().int().nullable(),
	steps: z.array(userStepSchema).min(1),
})
