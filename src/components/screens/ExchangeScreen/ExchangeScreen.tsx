import { FC, memo } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import classNames from './ExchangeScreen.module.pcss'

export interface ExchangeScreenProps {}

const History = memo(withErrorBoundary(HistoryCard))
const Swap = memo(withErrorBoundary(SwapCard))
const News = memo(withErrorBoundary(NewsCard))
const Chart = memo(withErrorBoundary(ChartCard))

export const ExchangeScreen: FC<ExchangeScreenProps> = () => {
	const isDesktop = useMediaQuery('mobile')

	const desktopLayout = (
		<div className={`row ${classNames.container}`}>
			<div className={classNames.mainCardStack}>
				<Chart />
				<News />
			</div>
			<div className={classNames.secondaryCardStack}>
				<Swap />
				<History />
			</div>
		</div>
	)

	const mobileLayout = (
		<div className={classNames.container}>
			<div className={classNames.mainCardStack}>
				<Swap />
				<Chart />
				<News />
				<History />
			</div>
		</div>
	)

	return <div style={{ width: '100%', height: '100%' }}>{isDesktop ? desktopLayout : mobileLayout}</div>
}
