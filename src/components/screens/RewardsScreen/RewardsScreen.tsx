import classNames from './RewardsScreen.module.pcss'
import { QuestsGroup } from '../../rewards/Quests/QuestsGroup/QuestsGroup'
import { LeaderboardCard } from '../../rewards/LeaderboardCard/LeaderboardCard'
import { type IUser } from '../../../api/concero/user/userType'
import { RewardsProfile } from '../../rewards/RewardsProfile/RewardsProfile'

interface Props {
	user: IUser | null | undefined
}

export const RewardsScreen = ({ user }: Props) => {
	return (
		<div className={classNames.rewardsScreenContainer}>
			<div className={classNames.rewardsWrapper}>
				{user && <RewardsProfile user={user} />}
				<QuestsGroup user={user} />
				<LeaderboardCard user={user} />
			</div>
		</div>
	)
}
