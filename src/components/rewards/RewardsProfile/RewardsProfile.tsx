import { TUserResponse, useUserByAddress } from '@/entities/User'
import { StreaksCard } from '../StreaksCard/StreaksCard'

interface Props {
	user: TUserResponse
}

export const RewardsProfile = ({ user }: Props) => {
	return (
		<div className="gap-lg">
			<StreaksCard user={user} />
		</div>
	)
}
