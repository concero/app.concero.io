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

export enum PointsBooster {
	MultiplyX2 = 2,
	MultiplyX5 = 5,
	MultiplyX10 = 10,
	// other boosters...
}

export interface IUser {
	_id: string
	address: string
	tier: IUserTier
	points: number
	passedQuests: IPassedQuest[]
	multiplier: PointsBooster
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
