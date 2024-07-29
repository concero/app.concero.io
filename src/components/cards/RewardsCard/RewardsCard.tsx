import classNames from './RewardsCard.module.pcss'
import { Card } from '../Card/Card'
import { useAccount } from 'wagmi'
import BlockiesSvg from 'blockies-react-svg'
import { truncateWallet } from '../../../utils/formatting'
import { IconChevronRight } from '@tabler/icons-react'
import { Button } from '../../buttons/Button/Button'

import LegoIcon from '../../../assets/icons/achievements/lego.svg'
import CrownIcon from '../../../assets/icons/achievements/crown.svg'
import RobotIcon from '../../../assets/icons/achievements/robot.svg'
import AlienIcon from '../../../assets/icons/achievements/alien.svg'
import { TooltipComingSoonContent } from '../../layout/Header/Header/TooltipContent'
import { WithTooltip } from '../../wrappers/WithTooltip'

const RewardsHeader = () => {
	const { address } = useAccount()

	return (
		<div className={classNames.header}>
			<div className="row gap-md ac">
				<BlockiesSvg address={address!} className={classNames.avatar} />
				<div className="afs">
					<h3>concero.eth</h3>
					<p className="body1">{address ? truncateWallet(address) : 'Connect your wallet'}</p>
				</div>
			</div>

			<button className={classNames.pointsButton}>
				<div>
					<h4>1589 points</h4>
					<span className="body1">2x multiplier</span>
				</div>
				<IconChevronRight width={16} height={16} stroke={2} color={'var(--color-primary-650)'} />
			</button>
		</div>
	)
}

const SocialNetworkChecks = () => {
	return (
		<div className="row gap-md wrap">
			<Button className={classNames.connectSocialNetworkButton} variant="light">
				<h4>Connect Discord</h4>
				<span className="body1">+5 points</span>
			</Button>
			<Button className={classNames.connectSocialNetworkButton} variant="light">
				<h4>Connect Twitter</h4>
				<span className="body1">+5 points</span>
			</Button>
		</div>
	)
}

const AchievementsPreview = () => {
	const achievements = [AlienIcon, CrownIcon, RobotIcon, LegoIcon, RobotIcon, CrownIcon, AlienIcon]

	const OpenAchievementsButton = () => (
		<Button
			className={classNames.achievementButton}
			size="xs"
			variant="black"
			rightIcon={<IconChevronRight width={16} height={16} stroke={2} color={'var(--color-grey-550)'} />}
		>
			See all achievements
		</Button>
	)

	const ComingSoon = WithTooltip({
		WrappedComponent: OpenAchievementsButton,
		Tooltip: TooltipComingSoonContent,
	})

	return (
		<div>
			<span className={classNames.separator} />
			<div className="row jsb ac wrap">
				<div className="row gap-md">
					{achievements.map(achievement => (
						<img width={24} height={24} src={achievement} alt="achievement" />
					))}
				</div>
				{ComingSoon}
			</div>
		</div>
	)
}

export const RewardsCard = () => {
	return (
		<Card className={classNames.container}>
			<RewardsHeader />
			<SocialNetworkChecks />
			<AchievementsPreview />
		</Card>
	)
}
