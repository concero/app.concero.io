import { type PointsBooster } from '../user/userType'

export enum QuestConditionType {
	ProvideLiquidity = 'ProvideLiquidity',
	ConnectDiscord = 'ConnectDiscord',
	ConnectTwitter = 'ConnectTwitter',
	CommunityRewards = 'CommunityRewards',
}

export interface IQuestCondition {
	type: QuestConditionType
	description: string
	targetNumber?: number
	targetValue?: string
	link?: string
}

export interface IQuest {
	_id: string
	name: string
	description: string
	image: string
	startDate: number
	endDate: number
	conditions: IQuestCondition[]
	rewards: {
		points: number
		booster?: PointsBooster
	}
	position: number
}
