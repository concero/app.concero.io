import { z } from 'zod'
const UserStepStatus = z.enum(['in_progress', 'verified', 'done'])

export const userStepSchema = z.object({
	id: z.string().uuid(),
	stepId: z.string().uuid(),
	userQuestId: z.string().uuid(),
	status: UserStepStatus,
})
