import { z } from 'zod'
import { customRewardSchema, tokenRewardSchema, roleSchema, rewardSchema, RewardTypeSchema } from './validations'

export type CustomRewardDTO = z.infer<typeof customRewardSchema>
export type TokenRewardDTO = z.infer<typeof tokenRewardSchema>
export type RoleDTO = z.infer<typeof roleSchema>
export type RewardDTO = z.infer<typeof rewardSchema>
export type RewardType = z.infer<typeof RewardTypeSchema>
