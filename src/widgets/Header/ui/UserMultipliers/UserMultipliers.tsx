import { Text } from '@/shared/ui'
import cls from './UserMultipliers.module.pcss'
import { TUserResponse } from '@/entities/User'
import { HStack, VStack } from '@/shared/ui/Stack'

export const UserMultipliers = ({ user }: { user: TUserResponse }) => {
	const { base, daily_swaps, liquidity_pool } = user.multiplier
	const totalMultiplier = (base || 0) + (daily_swaps || 0) + (liquidity_pool || 0)
	return (
		<VStack gap="space_0_75" justify="between" className={cls.user_multipliers}>
			<HStack justify="between" className={cls.multiplier_heading}>
				<Text variant="heading_small" className={cls.heading}>
					Multipliers
				</Text>
				<Text variant="heading_small" className={cls.multiplier_value}>
					{totalMultiplier}x
				</Text>
			</HStack>
			<VStack gap="space_0_5" className={cls.multiplier_components}>
				<HStack justify="between" className={cls.item}>
					<Text variant="body_medium">Base</Text>
					<Text variant="heading_small">{base || 0}x</Text>
				</HStack>
				<HStack justify="between" className={cls.item}>
					<Text variant="body_medium">Liquidity Holding</Text>
					<Text variant="heading_small">{liquidity_pool || 0}x</Text>
				</HStack>
				<HStack justify="between" className={cls.item}>
					<Text variant="body_medium">Daily Swapping</Text>
					<Text variant="heading_small">{daily_swaps || 0}x</Text>
				</HStack>
			</VStack>
		</VStack>
	)
}
