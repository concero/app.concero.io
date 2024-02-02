import { type FC, useEffect, useRef, useState } from 'react'
import classNames from './SwapDetails.module.pcss'
import { RouteButton } from './RouteButton/RouteButton'
import { type SwapDetailsProps } from '../types'
import { action, category } from '../../../../constants/tracking'
import { trackEvent } from '../../../../hooks/useTracking'
import { useTranslation } from 'react-i18next'
import { animated, useSpring } from '@react-spring/web'
import { SelectRouteModal } from './SelectRouteModal/SelectRouteModal'
import { easeQuadInOut } from 'd3-ease'
import { ReviewRouteCard } from './ReviewRouteCard/ReviewRouteCard'
import { SwapCardStage } from '../swapReducer/types'
import { RouteDetailsModal } from './RouteDetailsModal/RouteDetailsModal'

export const SwapDetails: FC<SwapDetailsProps> = ({ swapState, swapDispatch }) => {
	const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<boolean>(false)
	const [animatedContainerHeight, setAnimatedContainerHeight] = useState<number>(0)
	const [isReviewRouteModalVisible, setIsReviewRouteModalVisible] = useState<boolean>(false)
	const routeContainerRef = useRef<HTMLDivElement>(null)
	const reviewRouteCardRef = useRef<HTMLDivElement>(null)
	const { selectedRoute } = swapState
	const { t } = useTranslation()

	const containerAnimation = useSpring({
		height: selectedRoute ? animatedContainerHeight : 0,
		opacity: selectedRoute ? 1 : 0,
		config: { duration: 200, easing: easeQuadInOut },
	})

	useEffect(() => {
		if (swapState.stage === SwapCardStage.input) {
			if (routeContainerRef.current) {
				setAnimatedContainerHeight(routeContainerRef.current.scrollHeight)
			}
		} else if (swapState.stage === SwapCardStage.review) {
			if (reviewRouteCardRef.current) {
				setAnimatedContainerHeight(reviewRouteCardRef.current.scrollHeight)
			}
		}
	}, [routeContainerRef.current?.scrollHeight, reviewRouteCardRef.current?.scrollHeight, swapState.stage])

	return (
		<animated.div style={containerAnimation}>
			<div className={classNames.swapDetailsContainer}>
				{swapState.stage === 'input' ? (
					<div className={classNames.selectRouteButtonContainer} ref={routeContainerRef}>
						<p className={'body1'}>{t('swapCard.route')}</p>
						<RouteButton
							selectedRoute={selectedRoute}
							onClick={() => {
								void trackEvent({
									action: action.OpenRoutesModal,
									category: category.SwapCard,
									label: 'route_modal_opened',
								})
								setIsSelectRouteModalVisible(true)
							}}
						/>
						<SelectRouteModal
							swapState={swapState}
							swapDispatch={swapDispatch}
							isOpen={isSelectRouteModalVisible}
							setIsOpen={setIsSelectRouteModalVisible}
						/>
					</div>
				) : (
					<div
						className={classNames.reviewContainer}
						ref={reviewRouteCardRef}
						onClick={() => {
							setIsReviewRouteModalVisible(true)
						}}
					>
						<ReviewRouteCard swapState={swapState} />
					</div>
				)}
			</div>
			{selectedRoute ? (
				<RouteDetailsModal
					selectedRoute={selectedRoute}
					isOpen={isReviewRouteModalVisible}
					setIsOpen={setIsReviewRouteModalVisible}
				/>
			) : null}
		</animated.div>
	)
}
