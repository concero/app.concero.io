import cls from './RewardsPage.module.pcss'
import { useAccount } from 'wagmi'
import { TUserResponse } from '@/entities/User'
import { DailyTaskList } from '@/features/Quest'
import { QuestPreviewList } from '@/widgets/Quest'
import { LoginRequired } from '@/features/Auth'
import { PageWrap } from '@/shared/ui/PageWrap/PageWrap'
import { Banners } from '@/entities/Social'
import { ProfilePlaceholder } from '@/components/rewards/ProfileCard/ProfilePlaceholder/ProfilePlaceholder'
import { StreaksPlaceholders } from '@/components/rewards/StreaksCard/StreakCard/StreakPlaceholder/StreakPlaceholder'
import { TechWorksScreen } from '@/components/screens/TechWorksScreen/TechWorksScreen'
import { config } from '@/constants/config'
import { HoldingStreak } from '@/features/User'
import { SwappingStreak } from '@/features/User/ui/SwappingStreak/SwappingStreak'

interface Props {
	user: TUserResponse | null
	loading: boolean
}

export const RewardsPage = ({ user, loading }: Props) => {
	const { isConnected } = useAccount()
	if (config.REWARD_IS_NOT_AVAILABLE) {
		return <TechWorksScreen />
	}
	if (!isConnected) {
		return (
			<div className={cls.rewardsScreenContainer}>
				<LoginRequired />
			</div>
		)
	}
	return (
		<PageWrap>
			<div className={cls.rewardsScreenContainer}>
				<div className={cls.rewardsWrapper}>
					<Banners />
					{isConnected &&
						(loading ? (
							<>
								<ProfilePlaceholder />
								<StreaksPlaceholders />
							</>
						) : (
							user && (
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
									}}
								>
									<HoldingStreak user={undefined} />
									<SwappingStreak user={user} />
								</div>
							)
						))}
					<DailyTaskList />
					<QuestPreviewList />
				</div>
			</div>
		</PageWrap>
	)
}
