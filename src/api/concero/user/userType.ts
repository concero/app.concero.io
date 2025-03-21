export type CompletedSteps = number[]
export type IQuestsInProgressMap = Record<any, any>
export type ICompletedQuestsMap = Record<any, any>
/**@deprecated */
export interface IUserTier {
	level: string
	title: string
	bonuses: string[]
	pointsRequired: number
}
/**@deprecated */
export interface UserStreaks {
	dailySwap: number
	liquidityHold: number
}
/**@deprecated */
export interface UserMultiplier {
	default: number
	dailySwap: number | null
	liquidityHold: number | null
}
/**@deprecated */
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
/**@deprecated */
export interface IUser {
	_id: string
	address: string
	tier: IUserTier
	points: number
	completedQuests?: ICompletedQuestsMap
	questsInProgress: IQuestsInProgressMap
	multiplier: UserMultiplier
	streak: UserStreaks
	connectedSocials: UserConnectedSocials
	termsOfUse?: {
		accepted_version: string | null
	}
}
