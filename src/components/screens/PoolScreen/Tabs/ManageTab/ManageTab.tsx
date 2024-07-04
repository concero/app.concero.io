import classNames from './ManageTab.module.pcss'
import { LiquidityCapCard } from '../../../../cards/LiquidityCapCard/LiquidityCapCard'
import { AverageApyCard } from '../../../../cards/AverageApyCard/AverageApyCard'
import { PoolCard } from '../../../../cards/PoolCard/PoolCard'

export const ManageTab = () => {
	return (
		<div className={classNames.depositTab}>
			<div className={classNames.statisticBlock}>
				<LiquidityCapCard maxCapValue="100,000" />
				<AverageApyCard />
			</div>
			<PoolCard />
		</div>
	)
}
