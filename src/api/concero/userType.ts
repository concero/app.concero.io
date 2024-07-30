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

export enum PointsBoosters {
	MultiplyX2 = 2,
	MultiplyX5 = 5,
	MultiplyX10 = 10,
	// other boosters...
}

export interface IUser {
	address: string
	tier: IUserTier
	points: number
	passedQuests: IPassedQuest[]
	multipliers: {
		boosters: PointsBoosters[]
	}
	subscriptions: {
		twitter: boolean
		discord: boolean
	}
}
