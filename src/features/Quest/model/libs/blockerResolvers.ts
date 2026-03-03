import { TQuestBlocker } from '@/entities/Quest'
import { questServiceApi } from '@/entities/Quest'
import { TUserResponse, userServiceApi } from '@/entities/User'
import { toLocaleNumber } from '@/shared/lib/utils/formatting'
import dayjs from 'dayjs'
import { Address } from 'viem'

export type BlockerType = keyof TQuestBlocker
export type BlockerResolver = (...args: any) => Promise<{ current: number }>
export type BlockerResolvers = {
	[K in BlockerType]: BlockerResolver
}
export const blockerResolvers = {
	swaps_min_count: async (arg: { address: string }): Promise<{ current: number }> => {
		const { address } = arg
		const now = dayjs()
		const from = now.subtract(1, 'year').unix()
		const to = now.unix()
		const result = await userServiceApi.getUserCountTx({
			address,
			from,
			to,
		})
		return {
			current: result.payload.count,
		}
	},
	swaps_max_count: async (arg: { address: string }): Promise<{ current: number }> => {
		const { address } = arg
		const now = dayjs()
		const from = now.subtract(1, 'year').unix()
		const to = now.unix()
		const result = await userServiceApi.getUserCountTx({
			address,
			from,
			to,
		})
		return {
			current: result.payload.count,
		}
	},
	swaps_min_volume: async (arg: { address: string }): Promise<{ current: number }> => {
		const { address } = arg
		const now = dayjs()
		const from = now.subtract(1, 'year').unix()
		const to = now.unix()
		const result = await userServiceApi.getUserVolume({
			address,
			from,
			to,
		})
		return {
			current: result.payload.volumeUSD,
		}
	},
	swaps_max_volume: async (arg: { address: string }): Promise<{ current: number }> => {
		const { address } = arg
		const now = dayjs()
		const from = now.subtract(1, 'year').unix()
		const to = now.unix()
		const result = await userServiceApi.getUserVolume({
			address,
			from,
			to,
		})
		return {
			current: result.payload.volumeUSD,
		}
	},
	swaps_streak_min_time: async (arg: { address?: string; user?: TUserResponse }): Promise<{ current: number }> => {
		const address = arg.address
		const user = arg.user
		if (user) {
			const swapStreak = user.streak.daily_swaps
			return { current: swapStreak ?? 0 }
		} else if (address) {
			const result = await userServiceApi.findUserByAddress(address as Address)
			if (result.payload?.streak) {
				const swapStreak = result.payload.streak.daily_swaps
				return { current: swapStreak ?? 0 }
			} else {
				console.warn('swaps_streak_min_time | Streak not found', { result })
			}
		}
		console.error('swaps_streak_min_time | Address or User not pass', { arg })
		return {
			current: 0,
		}
	},
	liquidity_pool_loan_min_time: async (arg: {
		address?: string
		user?: TUserResponse
	}): Promise<{ current: number }> => {
		const address = arg.address
		const user = arg.user
		if (user) {
			const lpStreak = user.streak.liquidity_pool
			return { current: lpStreak ?? 0 }
		} else if (address) {
			const result = await userServiceApi.findUserByAddress(address as Address)
			if (result.payload?.streak) {
				const lpStreak = result.payload.streak.liquidity_pool
				return { current: lpStreak ?? 0 }
			} else {
				console.warn('liquidity_pool_loan_min_time | Streak not found', { result })
			}
		}
		console.error('liquidity_pool_loan_min_time | Address or User not pass', { arg })
		return {
			current: 0,
		}
	},
	liquidity_pool_loan_min_volume: async (arg: { address: string }): Promise<{ current: number }> => {
		const { address } = arg
		const result = await userServiceApi.fetchUserEarnings(address as Address)
		const balance = result ? Number(toLocaleNumber(result.earnings + result.deposit, 2)) : 0
		return {
			current: balance,
		}
	},
	quests_total_completed: async function (arg: { address: string }): Promise<{ current: number }> {
		const { address } = arg
		const result = await questServiceApi.countUserQuest({
			address,
			filters: {
				isCompleted: true,
			},
		})
		return {
			current: result.payload.count,
		}
	},
} satisfies BlockerResolvers
