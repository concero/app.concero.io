import { type FC } from 'react'
import classNames from './PortfolioScreen.module.pcss'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import { HighlightsCard } from '../../cards/HighlightsCard/HighlightsCard'
import { BarChartCard } from '../../cards/BarChartCard/BarChartCard'
import { HoldingsCard } from '../../cards/HoldingsCard/HoldingsCard'

export interface PortfolioScreenProps {}

export const PortfolioScreen: FC<PortfolioScreenProps> = () => (
	<div className={`row ${classNames.container}`}>
		<div className={classNames.mainCardStack}>
			<div className={classNames.horizontalCardStack}>
				<HighlightsCard />
				<BarChartCard />
			</div>
			<ChartCard />
		</div>
		<div className={classNames.secondaryCardStack}>
			<HoldingsCard />
			<HistoryCard />
		</div>
	</div>
)
