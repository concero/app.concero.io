import { memo } from 'react'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { withErrorBoundary } from '../../wrappers/WithErrorBoundary'
import { SwapCard } from '../../cards/SwapCard/SwapCard'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import classNames from './SwapScreen.module.pcss'
import { TargetInfoCard } from '../../cards/TargetInfoCard/TargetInfoCard'
import { NewsCard } from '../../cards/NewsCard/NewsCard'
import { HistoryCard } from '../../cards/HistoryCard/HistoryCard'

const History = memo(withErrorBoundary(HistoryCard))
const Swap = memo(withErrorBoundary(SwapCard))
const News = memo(withErrorBoundary(NewsCard))
const Chart = memo(withErrorBoundary(ChartCard))

interface SwapScreenProps {
	isNewSwapCardMode: boolean
	setIsNewSwapCardMode: (isNewSwapCardMode: boolean) => void
}

export const SwapScreen = ({ isNewSwapCardMode, setIsNewSwapCardMode }: SwapScreenProps) => {
	const isMobile = useMediaQuery('mobile')

	const desktopLayout = (
		<div className={`row ${classNames.container}`}>
			<div className={classNames.mainCardStack}>
				<Chart />
			</div>
			<div className={classNames.secondaryCardStack}>
				<Swap isNewSwapCardMode={isNewSwapCardMode} />
				<TargetInfoCard />
			</div>
		</div>
	)

	const mobileLayout = (
		<div className={classNames.container}>
			<div className={classNames.mainCardStack}>
				<Swap isNewSwapCardMode={isNewSwapCardMode} />
				<Chart />
				<TargetInfoCard />
			</div>
		</div>
	)

	const newSwapScreenLayout = (
		<div className={classNames.newSwapCardContainer}>
			<div className={classNames.newSwapCardInnerContainer}>
				<Swap isNewSwapCardMode={isNewSwapCardMode} />
			</div>
			<div className={classNames.switchToOldVersionButtonContainer}>
				<h5
					className={classNames.switchToOldVersionButton}
					onClick={() => {
						setIsNewSwapCardMode(false)
					}}
				>
					Switch back to old version
				</h5>
			</div>
		</div>
	)

	if (isNewSwapCardMode) {
		return <div className={classNames.newSwapScreenContainer}>{newSwapScreenLayout}</div>
	}

	return <div style={{ width: '100%', height: '100%' }}>{isMobile ? mobileLayout : desktopLayout}</div>
}
