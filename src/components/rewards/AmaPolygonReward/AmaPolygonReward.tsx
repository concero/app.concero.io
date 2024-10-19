import classNames from './AmaPolygonReward.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { type IUser } from '../../../api/concero/user/userType'
import { useEffect, useState } from 'react'
import { PolygonLogo } from './PolygonLogo'
import { claimAmaPolygonReward } from '../../../api/concero/rewards/amaPolygonReward/cliamAmaPolygonReward'
import { checkAmaPolygonReward } from '../../../api/concero/rewards/amaPolygonReward/checkAmaPolygonReward'

interface Props {
	user: IUser
}

export const AmaPolygonReward = ({ user }: Props) => {
	const [isShow, setIsShow] = useState(false)
	const [rewardIsClaimed, setRewardIsClaimed] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkAmaPolygonReward(user.address).then(response => {
			setIsShow(response)
		})
	}, [])

	const claimReward = async () => {
		try {
			setIsLoading(true)
			const isClaimed = await claimAmaPolygonReward(user.address)
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
			<div className={classNames.logo}>
				<PolygonLogo />
			</div>
			<p className={classNames.title}>AMA with Polygon – 15 CERs</p>
			<p className={classNames.subtitle}>
				Congratulations! You have received 15 extra CERs for attending AMA with Polygon!
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
