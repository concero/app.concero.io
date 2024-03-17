import { memo } from 'react'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import classNames from './SwapScreen.module.pcss'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'

const History = memo(withErrorBoundary(HistoryCard))
const Swap = memo(withErrorBoundary(SwapCard))
const News = memo(withErrorBoundary(NewsCard))
const Chart = memo(withErrorBoundary(ChartCard))

export const SwapScreen = () => {
	const newSwapScreenLayout = (
		<div className={classNames.newSwapCardContainer}>
			<Swap />
		</div>
	)

	return <div className={classNames.newSwapScreenContainer}>{newSwapScreenLayout}</div>
}
