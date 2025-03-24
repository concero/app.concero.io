import { TUserResponse, useUserByAddress } from '@/entities/User'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { StreaksCard } from '../StreaksCard/StreaksCard'
import { isAdminAddress } from '@/shared/lib/tests/isAdminAddress'

interface Props {
	user: TUserResponse
}

export const RewardsProfile = ({ user }: Props) => {
	const isAdmin = isAdminAddress(user.address)
	return (
		<div className="gap-lg">
			{isAdmin ? null : <ProfileCard user={user} />}
			<StreaksCard user={user} />
		</div>
	)
}
