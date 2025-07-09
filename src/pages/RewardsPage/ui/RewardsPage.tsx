import cls from './RewardsPage.module.pcss'
import { QuestPreviewList } from '@/widgets/Quest'
import { DailyTaskList } from '@/features/Quest'
import { HoldingStreak, SwappingStreak } from '@/features/User'
import { TUserResponse } from '@/entities/User'
import { Banners } from '@/entities/Social'
import { PageWrap } from '@/shared/ui/PageWrap/PageWrap'
import { TechWorksScreen } from '@/components/screens/TechWorksScreen/TechWorksScreen'
import { config } from '@/constants/config'

interface Props {
	user: TUserResponse | null
}

export const RewardsPage = ({ user }: Props) => {
	if (config.REWARD_IS_NOT_AVAILABLE) {
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
