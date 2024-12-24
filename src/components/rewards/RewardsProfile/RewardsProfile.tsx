import { type IUser } from '../../../api/concero/user/userType'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { StreaksCard } from '../StreaksCard/StreaksCard'
import { SpecialRewardBanner } from '../specialRewardBanner/SpecialRewardBanner'
import { checkChristmasGift } from '../../../api/concero/rewards/loyaltyReward/checkChristmasGift'
import { claimChristmasGift } from '../../../api/concero/rewards/loyaltyReward/claimChristmasGift'
import { GiftIcon } from '../../../assets/icons/GiftIcon'

interface Props {
	user: IUser
}

export const RewardsProfile = ({ user }: Props) => {
	return (
		<div className="gap-lg">
			<ProfileCard user={user} />
			<SpecialRewardBanner
				user={user}
				checkReward={checkChristmasGift}
				claimReward={claimChristmasGift}
				icon={<GiftIcon />}
				title={'Merry Lancmas CERs gift'}
				subtitle={'CERs have been given randomly by Santa to Lancans under the Concero rewards tree'}
				variant="pink"
			/>
			<StreaksCard user={user} />
		</div>
	)
}
