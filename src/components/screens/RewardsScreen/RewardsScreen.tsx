import classNames from './RewardsScreen.module.pcss'
import { useAccount } from 'wagmi'
import { ProfilePlaceholder } from '../../rewards/ProfileCard/ProfilePlaceholder/ProfilePlaceholder'
import { StreaksPlaceholders } from '../../rewards/StreaksCard/StreakCard/StreakPlaceholder/StreakPlaceholder'
import { RewardsProfile } from '../../rewards/RewardsProfile/RewardsProfile'
import { TechWorksScreen } from '../TechWorksScreen/TechWorksScreen'
import { config } from '../../../constants/config'
import { TUserResponse } from '@/entities/User'
import { DailyTaskList } from '@/features/Quest'
import { QuestPreviewList } from '@/widgets/Quest'
import { LoginRequired } from '@/features/Auth'
import { PageWrap } from '@/shared/ui/PageWrap/PageWrap'
import { Banners } from '@/entities/Social'

interface Props {
	user: TUserResponse | null
	loading: boolean
}

export const RewardsScreen = ({ user, loading }: Props) => {
	const { isConnected } = useAccount()
	if (config.REWARD_IS_NOT_AVAILABLE) {
		return <TechWorksScreen />
	}
	if (!isConnected) {
		return (
			<div className={classNames.rewardsScreenContainer}>
				<LoginRequired />
			</div>
		)
	}
	return (
		<PageWrap>
			<div className={classNames.rewardsScreenContainer}>
				<div className={classNames.rewardsWrapper}>
					<Banners />
					{isConnected &&
						(loading ? (
							<>
								<ProfilePlaceholder />
								<StreaksPlaceholders />
							</>
						) : (
							user && <RewardsProfile user={user} />
						))}
					<DailyTaskList />
					<QuestPreviewList />
				</div>
			</div>
		</PageWrap>
	)
}
