import classNames from './RewardsCard.module.pcss'
import { Card } from '../Card/Card'
import BlockiesSvg from 'blockies-react-svg'
import { truncateWallet } from '../../../utils/formatting'
import { IconChevronRight } from '@tabler/icons-react'
import { Button } from '../../buttons/Button/Button'

import LegoIcon from '../../../assets/icons/achievements/lego.svg'
import CrownIcon from '../../../assets/icons/achievements/crown.svg'
import RobotIcon from '../../../assets/icons/achievements/robot.svg'
import AlienIcon from '../../../assets/icons/achievements/alien.svg'
import { type IUser } from '../../../api/concero/user/userType'
import { useEffect, useState } from 'react'
import { type Address, createPublicClient } from 'viem'
import { SocialNetworkButtons } from './SocialNetworkButtons'
import { mainnet } from 'wagmi/chains'
import { http } from 'wagmi'

interface RewardsCardProps {
	user: IUser | null | undefined
}

export const publicClient = createPublicClient({
	chain: mainnet,
	transport: http(),
})

const RewardsHeader = ({ user }: RewardsCardProps) => {
	const [ensName, setEnsName] = useState<string | null>('')

	const handleGetEnsName = async () => {
		if (user?.address) {
			const ensName = await publicClient.getEnsName({
				address: user.address as Address,
			})

			setEnsName(ensName)
		}
	}

	useEffect(() => {
		void handleGetEnsName()
	}, [])

	return (
		<div className={classNames.header}>
			<div className="row gap-md ac">
				{user && <BlockiesSvg address={user.address} className={classNames.avatar} />}
				<div className="afs">
					{ensName ? (
						<>
							<h3>concero.eth</h3>
							<p className="body1">{truncateWallet(user.address)}</p>
						</>
					) : (
						<h3>{user?.address ? truncateWallet(user.address) : 'Connect your wallet'}</h3>
					)}
				</div>
			</div>

			<button className={classNames.pointsButton}>
				<div className="afs">
					<h4>{user?.points.toFixed(4) ?? '0'} CERs</h4>
					<span className="body1">{user && `${user.multiplier}x multiplier`}</span>
				</div>
				<IconChevronRight width={16} height={16} stroke={2} color={'var(--color-primary-650)'} />
			</button>
		</div>
	)
}

const AchievementsPreview = () => {
	const achievements = [AlienIcon, CrownIcon, RobotIcon, LegoIcon, RobotIcon, CrownIcon, AlienIcon]

	return (
		<div>
			<span className={classNames.separator} />
			<div className="row jsb ac wrap gap-md">
				<div className="row gap-md">
					{achievements.map(achievement => (
						<img width={24} height={24} src={achievement} alt="achievement" />
					))}
				</div>
				<Button
					className={classNames.achievementButton}
					size="xs"
					variant="black"
					rightIcon={<IconChevronRight width={16} height={16} stroke={2} color={'var(--color-grey-550)'} />}
				>
					See all achievements
				</Button>
			</div>
		</div>
	)
}

export const RewardsCard = ({ user }: RewardsCardProps) => {
	return (
		<Card className={classNames.container}>
			<RewardsHeader user={user} />
			<SocialNetworkButtons user={user} />
			<AchievementsPreview />
		</Card>
	)
}
