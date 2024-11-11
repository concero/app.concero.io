import { type IUser } from '../../../api/concero/user/userType'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { LoyaltyBonus } from '../LoyaltyBonus/LoyaltyBonus'
import { AmaPolygonReward } from '../AmaPolygonReward/AmaPolygonReward'
import { StreaksCard } from '../StreaksCard/StreaksCard'
import { type IUserAction } from '../../../api/concero/userActions/userActionType'

interface Props {
	user: IUser | null
	userActions: IUserAction[]
}

export const RewardsProfile = ({ user, userActions }: Props) => {
	if (!user) return null

	return (
		<div className="gap-lg">
			<ProfileCard userActions={userActions} user={user} />
			<LoyaltyBonus user={user} />
			<AmaPolygonReward user={user} />
			<StreaksCard user={user} />
		</div>
	)
}
