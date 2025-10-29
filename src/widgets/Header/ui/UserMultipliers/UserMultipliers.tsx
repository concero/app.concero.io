import { Text } from '@/shared/ui'
import cls from './UserMultipliers.module.pcss'
import { TUserResponse } from '@/entities/User'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Tag } from '@concero/ui-kit'

export const UserMultipliers = ({ user }: { user: TUserResponse }) => {
	const { base = 1, daily_swaps = 0, liquidity_pool = 0 } = user.multiplier
	return (
		<VStack gap="space_0_75" max className={cls.user_multipliers}>
			<VStack gap="space_0_25" max>
				<Text variant="heading_small" className={cls.heading}>
					Multipliers
				</Text>
				<Text variant="body_medium" className={cls.description_text}>
					The total multiplier combines base, swap, and liquidity values. Swap and liquidity multipliers
					change based on your actions — up to 4x. All multipliers are added together, not multiplied.
				</Text>
			</VStack>
			<VStack gap="space_0_5" max>
				<HStack justify="between" max>
					<Text variant="heading_small" className={cls.title_multiplier}>
						Base
					</Text>
					<Tag size="s" variant={base > 0 ? 'branded' : 'neutral'}>
						{base > 1 ? base : 1}x
					</Tag>
				</HStack>
				<div className={cls.separator}></div>
				<HStack justify="between" max>
					<Text variant="heading_small" className={cls.title_multiplier}>
						Liquidity Holding
					</Text>
					<Tag size="s" variant={liquidity_pool > 0 ? 'branded' : 'neutral'}>
						{liquidity_pool}x
					</Tag>
				</HStack>
				<div className={cls.separator}></div>

				<HStack justify="between" max>
					<Text variant="heading_small" className={cls.title_multiplier}>
						Daily Swapping
					</Text>
					<Tag size="s" variant={daily_swaps > 0 ? 'branded' : 'neutral'}>
						{daily_swaps}x
					</Tag>
				</HStack>
			</VStack>
		</VStack>
	)
}
