import { z } from 'zod'

export const blockerSchema = z.object({
	swaps_min_count: z.number().int().positive().nullable(),
	swaps_max_count: z.number().int().positive().nullable(),
	swaps_min_volume: z.number().nonnegative().nullable(),
	swaps_max_volume: z.number().nonnegative().nullable(),
	swaps_streak_min_time: z.number().int().nonnegative().nullable(),
	liquidity_pool_loan_min_time: z.number().int().nonnegative().nullable(),
	liquidity_pool_loan_min_volume: z.number().nonnegative().nullable(),
	quests_total_completed: z.number().int().nonnegative().nullable(),
})
