import { type FC, memo, useContext } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import classNames from './SwapScreen.module.pcss'
import { TargetInfoCard } from '../../cards/TargetInfoCard/TargetInfoCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import { FeatureFlagContext, FeatureFlags } from '../../../hooks/FeatureFlagContext'

export interface ExchangeScreenProps {}
const History = memo(withErrorBoundary(HistoryCard))
const Swap = memo(withErrorBoundary(SwapCard))
const News = memo(withErrorBoundary(NewsCard))
const Chart = memo(withErrorBoundary(ChartCard))

export const SwapScreen: FC<ExchangeScreenProps> = () => {
	const isMobile = useMediaQuery('mobile')
	const featureFlag = useContext<FeatureFlags>(FeatureFlagContext)

	const desktopLayout = (
		<div className={`row ${classNames.container}`}>
			<div className={classNames.mainCardStack}>
				<Chart />
			</div>
			<div className={classNames.secondaryCardStack}>
				<Swap />
				<TargetInfoCard />
			</div>
		</div>
	)

	const mobileLayout = (
		<div className={classNames.container}>
			<div className={classNames.mainCardStack}>
				<Swap />
				<Chart />
				<TargetInfoCard />
			</div>
		</div>
	)

	const newSwapScreenLayout = (
		<div className={classNames.newSwapCardContainer}>
			<Swap />
		</div>
	)

	if (featureFlag === FeatureFlags.newSwapScreenLayout) {
		return <div className={classNames.newSwapScreenContainer}>{newSwapScreenLayout}</div>
	}

	return <div style={{ width: '100%', height: '100%' }}>{isMobile ? mobileLayout : desktopLayout}</div>
}
