import { type IUserAction } from '../userActions/userActionType'
/**@deprecated */
export enum OnChainSource {
	INFRA = 'INFRA',
	POOL = 'POOL',
}
/**@deprecated */
export enum SocialSource {
	DISCORD = 'DISCORD',
	TWITTER = 'TWITTER',
}
/**@deprecated */
export enum QuestCategory {
	Socials = 'Socials',
	OnChain = 'OnChain',
	Campaign = 'Campaign',
	Common = 'Common',
}
/**@deprecated */
export enum QuestType {
	Campaign = 'Campaign',
	Daily = 'Daily',
	Monthly = 'Monthly',
	Big = 'Big',
	Primary = 'Primary', // weekly
	Secondary = 'Secondary', // weekly
}
/**@deprecated */
export enum VerificationStatus {
	SUCCESS = 'SUCCESS',
	PENDING = 'PENDING',
	FAILED = 'FAILED',
	NOT_STARTED = 'NOT_STARTED',
}
/**@deprecated */
export enum QuestSocialAction {
	ConnectSocialNetwork = 'ConnectSocialNetwork',
	ConnectGroup = 'ConnectGroup',
	Repost = 'Repost',
}
/**@deprecated */
export enum QuestOnChainAction {
	CheckVolume = 'CheckVolume',
	ProvideLiquidity = 'ProvideLiquidity',
}
/**@deprecated */
export interface QuestDateFilter {
	dateStart: number
	dateEnd: number
}
/**@deprecated */
export interface IQuestStep {
	id: string
	title: string
	description?: string
	source: SocialSource | OnChainSource
	questAction: QuestOnChainAction | QuestSocialAction
	options?: {
		link?: string
		value?: string
		isCrossChain?: boolean
		chainIds?: string[]
	}
	category: QuestCategory
	status: VerificationStatus
	order?: 1
	isComplete?: boolean
}
/**@deprecated */
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
		role?: boolean
	}
	type: QuestType
	category: QuestCategory
	userAction?: IUserAction
}
