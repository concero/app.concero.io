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
import { useMemo } from 'react'

interface Props {
	user: IUser | null
	loading: boolean
}

export const RewardsScreen = ({ user, loading }: Props) => {
	const { isConnected } = useAccount()
	if (
		config.REWARD_IS_NOT_AVAILABLE &&
		user?.address !== '0xffb54219e8e4b0e08e5fa503edc1cf3080f73869' &&
		user?.address !== '0x5b694ff6592f77958621595f94bffa05ac0724a1'
	) {
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
				<QuestsGroup user={user} />
				<LeaderboardCard user={user} />
			</div>
		</div>
	)
}
