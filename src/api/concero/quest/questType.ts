import { type IUserAction } from '../userActions/userActionType'

export enum OnChainSource {
	INFRA = 'INFRA',
	POOL = 'POOL',
}

export enum SocialSource {
	DISCORD = 'DISCORD',
	TWITTER = 'TWITTER',
}

export enum QuestCategory {
	Socials = 'Socials',
	OnChain = 'OnChain',
	Campaign = 'Campaign',
	Common = 'Common',
}

export enum QuestType {
	Campaign = 'Campaign',
	Daily = 'Daily',
	Primary = 'Primary', // weekly
	Secondary = 'Secondary', // weekly
}

export enum VerificationStatus {
	SUCCESS = 'SUCCESS',
	PENDING = 'PENDING',
	FAILED = 'FAILED',
	NOT_STARTED = 'NOT_STARTED',
}

export enum QuestSocialAction {
	ConnectSocialNetwork = 'ConnectSocialNetwork',
	ConnectGroup = 'ConnectGroup',
	Repost = 'Repost',
}

export enum QuestOnChainAction {
	CheckVolume = 'CheckVolume',
	ProvideLiquidity = 'ProvideLiquidity',
}

export interface QuestDateFilter {
	dateStart: number
	dateEnd: number
}

export interface IQuestStep {
	id: string
	title: string
	description?: string
	source: SocialSource | OnChainSource
	questAction: QuestOnChainAction | QuestSocialAction
	options?: {
		link?: string
		value?: string
	}
	category: QuestCategory
	status: VerificationStatus
	order?: 1
	isComplete?: boolean
}

export interface IQuest {
	_id: string
	name: string
	subtitle?: string
	description: string
	image?: string
	startDate: number
	endDate: number
	steps: IQuestStep[]
	rewards: {
		points: number
		multiplier: number
	}
	type: QuestType
	category: QuestCategory
	userAction?: IUserAction
}
