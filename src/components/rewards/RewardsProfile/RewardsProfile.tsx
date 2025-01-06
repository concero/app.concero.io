import { type IUser } from '../../../api/concero/user/userType'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { StreaksCard } from '../StreaksCard/StreaksCard'

interface Props {
	user: IUser
}

export const RewardsProfile = ({ user }: Props) => {
	return (
		<div className="gap-lg">
			<ProfileCard user={user} />
			<StreaksCard user={user} />
		</div>
	)
}
