import { type Address } from 'viem'

export interface IPassedQuest {
	id: string
	points: number
	date: Date
}

export interface IUserTier {
	level: string
	title: string
	bonuses: string[]
}

export interface UserStreaks {
	liquidityHoldingStreak: number
	dailySwappingStreak: number
}

export interface IUser {
	_id: string
	address: Address
	tier: IUserTier
	points: number
	passedQuests: IPassedQuest[]
	multiplier: number
	liquidityHoldingMultiplier: number
	dailySwappingMultiplier: number
	streaks: UserStreaks
	subscriptions: {
		twitter: {
			id: string
			screen_name: string
			name: string
		} | null
		discord: {
			id: string
			username: string
			email: string
			avatar: string
			locale: string
		} | null
	}
	position?: number
}
