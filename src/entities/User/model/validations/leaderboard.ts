import { z } from 'zod'

export const UserLeaderboardSchema = z.object({
	rank: z.number().int(),
	address: z.string(),
	points: z.number().int(),
})
export const UserLeaderboardResponseSchema = z.object({
	users: z.array(UserLeaderboardSchema),
})
