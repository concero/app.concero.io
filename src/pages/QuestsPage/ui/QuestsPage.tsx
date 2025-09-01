import { Banners } from '@/entities/Social'
import { SwappingStreak, HoldingStreak } from '@/features/User'
import { PageWrap } from '@/shared/ui'
import { DailyTaskList, QuestPreviewList } from '@/widgets/Quest'
import { useUserByAddress } from '@/entities/User'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

import cls from './QuestsPage.module.pcss'

export const QuestsPage = () => {
	const { address } = useAccount()
	const { data: userResponse } = useUserByAddress(address ? (address as Address) : undefined)
	const user = userResponse?.payload
	return (
		<PageWrap>
			<Banners />
			{user && (
				<div className={cls.streak_wrap}>
					<SwappingStreak user={user} />
					<HoldingStreak user={user} />
				</div>
			)}
			<DailyTaskList />
			<QuestPreviewList groups={['rewards']} />
		</PageWrap>
	)
}
