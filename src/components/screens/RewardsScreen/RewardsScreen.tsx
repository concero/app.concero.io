import classNames from './RewardsScreen.module.pcss'
import { RewardsCard } from '../../cards/RewardsCard/RewardsCard'
import { QuestsCard } from '../../cards/QuestsCard/QuestsCard'
import { LeaderboardCard } from '../../cards/LeaderboardCard/LeaderboardCard'

const InfoTitle = () => {
	return (
		<a className={classNames.infoTitle} href="/">
			<h5>Build the next big thing with Concero</h5>
			<span className="body3">Click here to learn the benefits</span>
		</a>
	)
}

export const RewardsScreen = () => {
	return (
		<div className={classNames.rewardsScreenContainer}>
			<div className={classNames.rewardsWrap}>
				<RewardsCard />
				<QuestsCard />
				<LeaderboardCard />
			</div>

			<InfoTitle />
		</div>
	)
}
