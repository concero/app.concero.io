export interface IQuestInProgress {
	questId: string
	completedSteps: number[]
}

export interface IUserTier {
	level: string
	title: string
	bonuses: string[]
	pointsRequired: number
}

export interface UserStreaks {
	dailySwap: number
	liquidityHold: number
}

export interface UserMultiplier {
	default: number
	dailySwap: number | null
	liquidityHold: number | null
}

export interface UserConnectedSocials {
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

export interface IUser {
	_id: string
	address: string
	tier: IUserTier | null
	points: number
	completedQuests: string[]
	questsInProgress: IQuestInProgress[]
	multiplier: UserMultiplier
	streak: UserStreaks
	connectedSocials: UserConnectedSocials
}
