import { timeFilters } from '../../../../../constants/timeFilters'
import { Card } from '../../../../cards/Card/Card'
import { LineChartCard } from '../../../../cards/LineChartCard/LineChartCard'
import { ProjectedEarningsCard } from '../../../../cards/ProjectedEarningsCard/ProjectedEarningsCard'
import { UserActionsCard, type UserTransaction } from '../../../../cards/UserActionsCard/UserActionsCard'
import { ProgressBar } from '../../../../layout/progressBar/ProgressBar'
import classNames from './EarningsTab.module.pcss'

const userActions: UserTransaction[] = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => {
	return {
		id: String(item),
		name: 'Withdrawal Complete',
		date: 'Today, 12:50',
		value: String(Math.floor(Math.random() * 10000)),
		status: item % 2 === 0 ? 'Available' : null,
	}
})

const PoolShareCard = () => (
	<Card className={`${classNames.poolShare} cardConvex`}>
		<h4 className="body4">Your pool share</h4>
		<h2>4.95 %</h2>
		<ProgressBar percentage={4.95} width={137} />
	</Card>
)

const UserLpCard = () => (
	<Card className={`${classNames.userLp} f1 cardConvex`}>
		<p className="body4">Your LPs</p>
		<h2>15,500 USDC</h2>
		<h4>15000 LPt</h4>
	</Card>
)

const EarningsCard = () => (
	<LineChartCard
		className={classNames.earnings}
		titleCard="Earnings"
		activeItem={timeFilters[0]}
		setActiveItem={() => {}}
		filterItems={timeFilters}
		commonValue="15 USDC"
	/>
)

export const EarningsTab = () => {
	const statisticBlock = (
		<div className={classNames.statisticBlock}>
			<div className={classNames.statisticLeftSide}>
				<div className={classNames.userValue}>
					<PoolShareCard />
					<UserLpCard />
				</div>
				<ProjectedEarningsCard />
			</div>
			<EarningsCard />
		</div>
	)

	return (
		<div className={classNames.earningsTab}>
			{statisticBlock}
			<UserActionsCard actions={userActions} />
		</div>
	)
}
