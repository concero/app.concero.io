import classNames from './LoyaltyBonus.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { type IUser } from '../../../api/concero/user/userType'
import { useEffect, useState } from 'react'
import { checkLoyaltyBonus } from '../../../api/concero/rewards/loyaltyReward/checkLoyaltyBonus'
import { claimLoyaltyBonus } from '../../../api/concero/rewards/loyaltyReward/claimLoyaltyBonus.ts'
import { HeartIcon } from '../../../assets/icons/HeartIcon'

interface Props {
	user: IUser
}

export const LoyaltyBonus = ({ user }: Props) => {
	const [isShow, setIsShow] = useState(false)
	const [rewardIsClaimed, setRewardIsClaimed] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkLoyaltyBonus(user.address).then(response => {
			setIsShow(response)
		})
	}, [])

	const claimReward = async () => {
		try {
			setIsLoading(true)
			const isClaimed = await claimLoyaltyBonus(user.address)
			setRewardIsClaimed(isClaimed)
		} catch (err) {
			console.error(err)
		}

		setIsLoading(false)
	}

	if (!isShow) return null

	return (
		<div className={classNames.container}>
			<div className={classNames.logoWrap}>
				<HeartIcon />
			</div>
			<p className={classNames.title}>Thanks for being a Loyal Lancan! - 15 CERs</p>
			<p className={classNames.subtitle}>
				Congratulations! You have received 15 extra CERs for being a Loyal Lancan!
			</p>
			<Button
				isDisabled={rewardIsClaimed}
				isLoading={isLoading}
				onClick={claimReward}
				size="md"
				className={classNames.button}
			>
				{rewardIsClaimed ? 'Claimed' : 'Claim'}
			</Button>
		</div>
	)
}
