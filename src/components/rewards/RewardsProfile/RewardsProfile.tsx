import { type IUser } from '../../../api/concero/user/userType'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { StreaksCard } from '../StreaksCard/StreaksCard'
import { HeartIcon } from '../../../assets/icons/HeartIcon'
import { SpecialRewardBanner } from '../specialRewardBanner/SpecialRewardBanner'
import { checkBTC100KBonus } from '../../../api/concero/rewards/loyaltyReward/checkBTC100KBonus'
import { claimBTC100KBonus } from '../../../api/concero/rewards/loyaltyReward/claimBTC100KBonus'

interface Props {
	user: IUser
}

export const RewardsProfile = ({ user }: Props) => {
	return (
		<div className="gap-lg">
			<ProfileCard user={user} />

			<SpecialRewardBanner
				user={user}
				checkReward={checkBTC100KBonus}
				claimReward={claimBTC100KBonus}
				icon={<HeartIcon />}
				title={'$BTC has reached 100,000! - 100 CERs'}
				subtitle={
					'As $BTC makes a huge price landmark of $100k, the Intern has kept his promise for dropping 100 CERs to all Lancans'
				}
				variant="pink"
			/>
			<StreaksCard user={user} />
		</div>
	)
}
