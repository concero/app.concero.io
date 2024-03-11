import { memo, useContext, useEffect, useState } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import classNames from './SwapScreen.module.pcss'
import { TargetInfoCard } from '../../cards/TargetInfoCard/TargetInfoCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'
import {
	FeatureFlagContext,
	FeatureFlagKeys,
	type FeatureFlags,
	FeatureFlagVariants,
} from '../../../hooks/FeatureFlagContext'
import { FullScreenLoader } from '../../layout/FullScreenLoader/FullScreenLoader'

const History = memo(withErrorBoundary(HistoryCard))
const Swap = memo(withErrorBoundary(SwapCard))
const News = memo(withErrorBoundary(NewsCard))
const Chart = memo(withErrorBoundary(ChartCard))

export const SwapScreen = () => {
	const isMobile = useMediaQuery('mobile')
	const featureFlags = useContext<FeatureFlags>(FeatureFlagContext)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (featureFlags[FeatureFlagKeys.newSwapScreenLayout] !== undefined) {
			setIsLoading(false)
		}
	}, [featureFlags[FeatureFlagKeys.newSwapScreenLayout]])

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

	if (isLoading) {
		return <FullScreenLoader />
	}

	if (featureFlags[FeatureFlagKeys.newSwapScreenLayout] === FeatureFlagVariants.newSwapCard) {
		return <div className={classNames.newSwapScreenContainer}>{newSwapScreenLayout}</div>
	}

	return <div style={{ width: '100%', height: '100%' }}>{isMobile ? mobileLayout : desktopLayout}</div>
}
