import classNames from './LoyaltyBonus.module.pcss'
import { LancaLogo } from './LancaLogo'
import { Button } from '../../buttons/Button/Button'
import { type IUser } from '../../../api/concero/user/userType'
import { useEffect, useState } from 'react'
import { checkLoyaltyBonus } from '../../../api/concero/rewards/checkLoyaltyBonus'
import { claimLoyaltyBonus } from '../../../api/concero/rewards/claimLoyaltyBonus.ts'

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
			console.log(isClaimed)
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
				<LancaLogo />
			</div>
			<p className={classNames.title}>Lancan Loyalty Bonus – 25 CERs</p>
			<p className={classNames.subtitle}>
				Congratulations! You have received 25 extra CERs for using Lanca in September
			</p>
			<Button
				isDisabled={rewardIsClaimed}
				isLoading={isLoading}
				onClick={claimReward}
				size="sm"
				className={classNames.button}
			>
				{rewardIsClaimed ? 'Claimed' : 'Claim'}
			</Button>
		</div>
	)
}
