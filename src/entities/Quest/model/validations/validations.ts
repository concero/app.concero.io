import { z } from 'zod'

export const OnChainSourceZod = z.enum(['INFRA', 'POOL'])

export const SocialSourceZod = z.enum(['DISCORD', 'TWITTER'])

export const QuestCategoryZod = z.enum(['Socials', 'OnChain', 'Campaign', 'Common'])

export const QuestTypeZod = z.enum(['Campaign', 'Daily', 'Monthly', 'Big', 'Primary', 'Secondary'])

export const VerificationStatusZod = z.enum(['SUCCESS', 'PENDING', 'FAILED', 'NOT_STARTED'])

export const QuestSocialActionZod = z.enum(['ConnectSocialNetwork', 'ConnectGroup', 'Repost'])

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
	questAction: z.union([QuestOnChainActionZod, QuestSocialActionZod]),
	options: z
		.object({
			link: z.string().optional(),
			value: z.string().optional(),
			isCrossChain: z.boolean().optional(),
			chainIds: z.array(z.string()).optional(),
		})
		.optional(),
	category: QuestCategoryZod,
	status: VerificationStatusZod,
	order: z.number().optional(),
	isComplete: z.boolean().optional(),
})

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
	category: QuestCategoryZod,
	userAction: z.any().optional(),
})
