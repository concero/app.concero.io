import { optional, z } from 'zod'

export const OnChainSourceZod = z.enum(['INFRA', 'POOL'])

export const SocialSourceZod = z.enum(['DISCORD', 'TWITTER', 'GOOGLE_FORM'])

export const QuestCategoryZod = z.enum(['Socials', 'OnChain', 'Common'])

export const QuestTypeZod = z.enum(['Campaign', 'Daily', 'Monthly', 'Big', 'Primary', 'Secondary'])

export const VerificationStatusZod = z.enum(['SUCCESS', 'PENDING', 'FAILED', 'NOT_STARTED'])

export const QuestSocialActionZod = z.enum(['ConnectSocialNetwork', 'ConnectGroup', 'Repost', 'LikeTweet'])
export const QuestTestingActionZod = z.enum(['ProvideFeedback', 'RateExperience'])

export const QuestOnChainActionZod = z.enum(['CheckVolume', 'ProvideLiquidity'])

export const QuestDateFilterZod = z.object({
	dateStart: z.number(),
	dateEnd: z.number(),
})

export const IQuestStepZod = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional(),
	source: z.union([SocialSourceZod, OnChainSourceZod]),
	questAction: z.union([QuestOnChainActionZod, QuestSocialActionZod, QuestTestingActionZod]),
	options: z
		.object({
			link: z.string().optional(),
			value: z.string().optional(),
			isCrossChain: z.boolean().optional(),
			chainId: z.array(z.string()).optional(),
		})
		.optional(),
	category: QuestCategoryZod,
	status: VerificationStatusZod,
	order: z.number().optional(),
	optional: z.boolean().optional(),
})
export const questTags = ['rewards', 'testing'] as const

export const questSizes = ['s', 'm', 'l', 'xl'] as const

export const IQuestZod = z.object({
	_id: z.string(),
	name: z.string(),
	subtitle: z.string().optional(),
	description: z.string(),
	image: z.string().optional(),
	startDate: z.number(),
	endDate: z.number(),
	steps: z.array(IQuestStepZod),
	rewards: z.object({
		points: z.number(),
		multiplier: z.number(),
		role: z.boolean().optional(),
	}),
	type: QuestTypeZod,
	priority: z.number().optional(),
	size: z.enum(questSizes).optional(),
	category: QuestCategoryZod,
	userAction: z.any().optional(),
	tag: z.enum(questTags).optional(),
	isNew: z.boolean().optional(),
})
