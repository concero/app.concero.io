import cls from './RewardsPage.module.pcss'
import { useAccount } from 'wagmi'
import { QuestPreviewList } from '@/widgets/Quest'
import { DailyTaskList } from '@/features/Quest'
import { LoginRequired } from '@/features/Auth'
import { HoldingStreak, SwappingStreak } from '@/features/User'
import { TUserResponse } from '@/entities/User'
import { Banners } from '@/entities/Social'
import { PageWrap } from '@/shared/ui/PageWrap/PageWrap'
import { TechWorksScreen } from '@/components/screens/TechWorksScreen/TechWorksScreen'
import { config } from '@/constants/config'
import { ProfilePlaceholder } from '@/components/rewards/ProfileCard/ProfilePlaceholder/ProfilePlaceholder'
import { StreaksPlaceholders } from '@/components/rewards/StreaksCard/StreakCard/StreakPlaceholder/StreakPlaceholder'
import { RewardsProfile } from '@/components/rewards/RewardsProfile/RewardsProfile'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

interface Props {
	user: TUserResponse | null
	loading: boolean
}

export const RewardsPage = ({ user, loading }: Props) => {
	const { isConnected, address } = useAccount()
	const isAdmin = isAdminAddress(address)
	if (config.REWARD_IS_NOT_AVAILABLE) {
		return <TechWorksScreen />
	}
	if (!isConnected) {
		return (
			<div className={cls.rewards_screen_container}>
				<LoginRequired />
			</div>
		)
	}
	return (
		<PageWrap>
			<Banners />
			{isAdmin ? (
				<div className={cls.streak_wrap}>
					<SwappingStreak user={null} />
					<HoldingStreak user={null} />
				</div>
			) : (
				isConnected &&
				(loading ? (
					<>
						<ProfilePlaceholder />
						<StreaksPlaceholders />
					</>
				) : (
					user && <RewardsProfile user={user} />
				))
			)}
			<DailyTaskList />
			<QuestPreviewList />
		</PageWrap>
	)
}
