import { optional, z } from 'zod'

export const UserTierZod = z.object({
	level: z.string(),
	title: z.string(),
	bonuses: z.array(z.string()),
	pointsRequired: z.number(),
})

export const UserStreaksZod = z.object({
	dailySwap: z.number(),
	liquidityHold: z.number(),
})

export const UserMultiplierZod = z.object({
	default: z.number(),
	dailySwap: z.number().nullable(),
	liquidityHold: z.number().nullable(),
})

export const UserConnectedSocialsZod = z
	.object({
		twitter: z
			.object({
				id: z.string(),
				screen_name: z.string(),
				name: z.string(),
			})
			.nullable(),
		discord: z
			.object({
				id: z.string(),
				username: z.string(),
				email: z.string(),
				avatar: z.string(),
				locale: z.string(),
			})
			.nullable(),
	})
	.nullable()
export const QuestInProgressZod = z.object({
	questId: z.string(),
	completedSteps: z.array(z.string()),
})

export const IUserZod = z.object({
	_id: z.string(),
	address: z.string(),
	nickname: z.string().optional(),
	email: z.string().optional(),
	tier: UserTierZod,
	points: z.number(),
	completedQuests: z.record(z.string(), z.any()).optional(),
	questsInProgress: z.array(QuestInProgressZod),
	multiplier: UserMultiplierZod,
	streak: UserStreaksZod,
	connectedSocials: UserConnectedSocialsZod,
	termsOfUse: z
		.object({
			accepted_version: z.string().nullable(),
		})
		.optional(),
})
