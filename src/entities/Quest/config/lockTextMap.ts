import { TQuestBlocker } from '../model/types/response'

export const lockTextMap = {
	swaps_min_count: x => `Make ${x} swaps with Lanca to unlock this quest`,
	swaps_max_count: x => `Make no more than ${x} swaps`,
	swaps_min_volume: x => `Swap at least ${x}`,
	swaps_max_volume: x => `Swap no more than ${x}`,
	swaps_streak_min_time: x => `Maintain a swap streak for at least ${x}`,
	liquidity_pool_loan_min_time: x => `Keep a loan open for at least ${x}`,
	liquidity_pool_loan_min_volume: x => `Borrow at least ${x}`,
	quests_total_completed: x => `Complete at least ${x} quests`,
} satisfies { [Key in keyof TQuestBlocker]: (x: number | string) => string }
