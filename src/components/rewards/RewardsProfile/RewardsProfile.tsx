import { type IUser } from '../../../api/concero/user/userType'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { StreaksCard } from '../StreaksCard/StreaksCard'
import { checkLoyaltyBonus } from '../../../api/concero/rewards/loyaltyReward/checkLoyaltyBonus'
import { HeartIcon } from '../../../assets/icons/HeartIcon'
import { claimLoyaltyBonus } from '../../../api/concero/rewards/loyaltyReward/claimLoyaltyBonus.ts'
import { SpecialRewardBanner } from '../specialRewardBanner/SpecialRewardBanner'

interface Props {
	user: IUser
}

export const RewardsProfile = ({ user }: Props) => {
	return (
		<div className="gap-lg">
			<ProfileCard user={user} />
			<SpecialRewardBanner
				user={user}
				checkReward={checkLoyaltyBonus}
				claimReward={claimLoyaltyBonus}
				icon={<HeartIcon />}
				title={'Thanks for being a Loyal Lancan! - 15 CERs'}
				subtitle={'Congratulations! You have received 15 extra CERs for being a Loyal Lancan!'}
				variant="pink"
			/>
			<StreaksCard user={user} />
		</div>
	)
}
