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

export interface IUser {
	address: string
	tier: IUserTier
	points: number
	passedQuests: IPassedQuest[]
	multiplier: number
	liquidityHoldingMultiplier: number
	dailySwappingMultiplier: number
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
}
