import { useUserByAddress } from '@/entities/User'
import { HoldingStreak, SwappingStreak } from '@/features/User'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import cls from './StreakBlock.module.pcss'
export const StreakBlock = () => {
	const { address } = useAccount()
	const { data: userResponse } = useUserByAddress(address ? (address as Address) : undefined)
	const user = userResponse?.payload
	if (!user) return null
	return (
		<div className={cls.streak_wrap}>
			<SwappingStreak user={user} />
			<HoldingStreak user={user} />
		</div>
	)
}
