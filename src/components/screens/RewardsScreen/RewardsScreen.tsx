import classNames from './RewardsScreen.module.pcss'
import { QuestsGroup } from '../../rewards/Quests/QuestsGroup/QuestsGroup'
import { LeaderboardCard } from '../../rewards/LeaderboardCard/LeaderboardCard'
import { useAccount } from 'wagmi'
import { type IUser } from '../../../api/concero/user/userType'
import { ProfilePlaceholder } from '../../rewards/ProfileCard/ProfilePlaceholder/ProfilePlaceholder'
import { StreaksPlaceholders } from '../../rewards/StreaksCard/StreakCard/StreakPlaceholder/StreakPlaceholder'
import { RewardsProfile } from '../../rewards/RewardsProfile/RewardsProfile'

import { TechWorksScreen } from '../TechWorksScreen/TechWorksScreen'
import { config } from '../../../constants/config'
import { TUserResponse } from '@/entities/User/model/types/response'
import { QuestPreviewList } from '@/features/Quest'
import { DailyTaskList } from '@/features/Quest/ui/DailyTaskList/DailyTaskList'

interface Props {
	user: TUserResponse | null
	loading: boolean
}

export const RewardsScreen = ({ user, loading }: Props) => {
	const { isConnected } = useAccount()
	if (config.REWARD_IS_NOT_AVAILABLE) {
		return <TechWorksScreen />
	}
	return (
		<div className={classNames.rewardsScreenContainer}>
			<div className={classNames.rewardsWrapper}>
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
				<LeaderboardCard user={user} />
			</div>
		</div>
	)
}
