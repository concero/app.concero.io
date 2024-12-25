import { type ReactNode, useEffect, useState } from 'react'
import classNames from './SpecialRewardBanner.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { type IUser } from '../../../api/concero/user/userType'

interface Props {
	user: IUser
	checkReward: (address: string) => Promise<any>
	claimReward: (address: string) => Promise<any>
	icon: ReactNode
	title: string
	subtitle: string
	variant: 'pink'
}

export const SpecialRewardBanner = ({
	user,
	checkReward,
	claimReward,
	icon,
	title,
	subtitle,
	variant = 'pink',
}: Props) => {
	const [isShow, setIsShow] = useState(true)
	const [rewardIsClaimed, setRewardIsClaimed] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		checkReward(user.address).then(response => {
			setIsShow(response)
		})
	}, [])

	const claimRewardHandler = async () => {
		try {
			setIsLoading(true)
			const isClaimed = await claimReward(user.address)
			setRewardIsClaimed(isClaimed)
		} catch (err) {
			console.error(err)
		}

		setIsLoading(false)
	}

	if (!isShow) return null

	return (
		<div className={`${classNames.container} ${classNames[variant]}`}>
			<div className={classNames.logoWrap}>{icon}</div>
			<p className={classNames.title}>{title}</p>
			<p className={classNames.subtitle}>{subtitle}</p>
			<Button
				isDisabled={rewardIsClaimed}
				isLoading={isLoading}
				onClick={claimRewardHandler}
				size="md"
				className={classNames.button}
			>
				{rewardIsClaimed ? 'Claimed' : 'Claim'}
			</Button>
		</div>
	)
}
