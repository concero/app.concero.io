import { useUserByAddress } from '@/entities/User'
import { HoldingStreak, SwappingStreak } from '@/features/User'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import cls from './StreakBlock.module.pcss'
import { StreaksBanner } from '@/entities/Social'
import { VStack } from '@/shared/ui/Stack'
export const StreakBlock = () => {
	const { address } = useAccount()
	const { data: userResponse } = useUserByAddress(address ? (address as Address) : undefined)
	const user = userResponse?.payload
	if (!user) return null
	return (
		<VStack align="center" gap="16px" max >
			<StreaksBanner />
			<div className={cls.streak_wrap}>
				<SwappingStreak user={user} />
				<HoldingStreak user={user} />
			</div>
		</VStack>
	)
}
