import classNames from './ManageTab.module.pcss'
import { LiquidityCapCard } from '../../../../cards/LiquidityCapCard/LiquidityCapCard'
import { AverageApyCard } from '../../../../cards/AverageApyCard/AverageApyCard'
import { Card } from '../../../../cards/Card/Card'

export const ManageTab = () => {
	return (
		<div className={classNames.depositTab}>
			<div className={classNames.statisticBlock}>
				<LiquidityCapCard currentCapValue="85402" maxCapValue="100,000" />
				<AverageApyCard />
			</div>
			<Card>Pool Card</Card>
		</div>
	)
}
