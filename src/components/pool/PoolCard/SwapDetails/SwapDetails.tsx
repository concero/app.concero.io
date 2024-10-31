import { type FC, useEffect, useRef, useState } from 'react'
import classNames from './SwapDetails.module.pcss'
import { type SwapDetailsProps } from '../types'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'
import { ReviewRouteCard } from './ReviewRouteCard/ReviewRouteCard'
import { Alert } from '../../../layout/Alert/Alert'
import { Separator } from '../../../layout/Separator/Separator'
import { ErrorCategory, errorTextMap, errorTypeMap } from '../SwapButton/constants'

export const SwapDetails: FC<SwapDetailsProps> = ({ swapState }) => {
	const [animatedContainerHeight, setAnimatedContainerHeight] = useState<number>(0)
	const reviewRouteCardRef = useRef<HTMLDivElement>(null)
	const { selectedRoute, inputError } = swapState

	const isTransactionError = inputError ? errorTypeMap[inputError] === ErrorCategory.transaction : false
	const isError = inputError && isTransactionError

	const containerAnimation = useSpring({
		height: selectedRoute || isError ? animatedContainerHeight : 0,
		opacity: selectedRoute || isError ? 1 : 0,
		config: { duration: 200, easing: easeQuadInOut },
	})

	useEffect(() => {
		if (!reviewRouteCardRef.current) return

		setAnimatedContainerHeight(isError ? 80 : 120)
	}, [reviewRouteCardRef.current, swapState.stage, inputError])

	return (
		<animated.div style={containerAnimation}>
			<div ref={reviewRouteCardRef} className={classNames.swapDetailsContainer}>
				<div className={classNames.reviewContainer}>
					{isError ? (
						<Alert title={errorTextMap[inputError]} variant="error" />
					) : (
						<ReviewRouteCard selectedRoute={selectedRoute} />
					)}
					<Separator />
				</div>
			</div>
		</animated.div>
	)
}
