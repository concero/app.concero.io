import classNames from './RewardsScreen.module.pcss'
import { QuestsGroup } from '../../rewards/Quests/QuestsGroup/QuestsGroup'
import { LeaderboardCard } from '../../rewards/LeaderboardCard/LeaderboardCard'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { type IUser } from '../../../api/concero/user/userType'
import { ProfilePlaceholder } from '../../rewards/ProfileCard/ProfilePlaceholder/ProfilePlaceholder'
import { StreaksPlaceholders } from '../../rewards/StreaksCard/StreakCard/StreakPlaceholder/StreakPlaceholder'
import { RewardsProfile } from '../../rewards/RewardsProfile/RewardsProfile'

interface Props {
	user: IUser | null
	loading: boolean
}

export const RewardsScreen = ({ user, loading }: Props) => {
	const { isConnected } = useAccount()

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
