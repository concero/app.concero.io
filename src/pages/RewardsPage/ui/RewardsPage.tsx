import cls from './RewardsPage.module.pcss'
import { QuestPreviewList } from '@/widgets/Quest'
import { HoldingStreak, SwappingStreak } from '@/features/User'
import { TUserResponse } from '@/entities/User'
import { Banners } from '@/entities/Social'
import { PageWrap } from '@/shared/ui/PageWrap/PageWrap'
import { TechWorksScreen } from '@/components/screens/TechWorksScreen/TechWorksScreen'
import { DailyTaskList } from '@/widgets/Quest'
import { configEnvs } from '@/shared/consts/config/config'
import { useAccount } from 'wagmi'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

interface Props {
	user: TUserResponse | null
}

export const RewardsPage = ({ user }: Props) => {
	const { address } = useAccount()
	if (configEnvs.REWARD_IS_NOT_AVAILABLE && !isAdminAddress(address)) {
		return <TechWorksScreen />
	}
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
			<QuestPreviewList />
		</PageWrap>
	)
}
