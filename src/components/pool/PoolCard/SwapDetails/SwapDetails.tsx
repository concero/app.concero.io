import { type FC, useEffect, useRef, useState } from 'react'
import classNames from './SwapDetails.module.pcss'
import { type SwapDetailsProps } from '../types'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'
import { Alert } from '../../../layout/Alert/Alert'
import { Separator } from '../../../layout/Separator/Separator'
import { ErrorType } from '../SwapButton/constants'
import { LancaAdd } from './LancaAdd/LancaAdd'
import { SwapCardStage } from '../swapReducer/types'

export const SwapDetails: FC<SwapDetailsProps> = ({ swapState }) => {
	const [animatedContainerHeight, setAnimatedContainerHeight] = useState<number>(0)
	const reviewRouteCardRef = useRef<HTMLDivElement>(null)
	const { inputError, from, poolMode, isLoading, stage } = swapState

	const isDeposit = poolMode === 'deposit'
	const isReview = stage === SwapCardStage.review

	const minAmount = isDeposit ? 100 : 0
	const amountIsAvailable = Number(from.amount) >= minAmount
	const isOpen = !isLoading && isReview && amountIsAvailable

	const isInsufficientBalance = isDeposit && inputError === ErrorType.LOW_BALANCE

	const containerAnimation = useSpring({
		height: isOpen ? animatedContainerHeight : 0,
		opacity: isOpen ? 1 : 0,
		config: { duration: 200, easing: easeQuadInOut },
	})

	useEffect(() => {
		if (!reviewRouteCardRef.current) return

		setAnimatedContainerHeight(isInsufficientBalance ? 163 : 80)
	}, [reviewRouteCardRef.current, swapState.stage, inputError])

	const alert = isDeposit ? (
		<Alert title="Withdrawal will take 7 days" />
	) : (
		<Alert variant="warning" title="Funds will be locked for 7 days" />
	)

	return (
		<animated.div style={containerAnimation}>
			<div ref={reviewRouteCardRef} className={classNames.swapDetailsContainer}>
				<div className={classNames.reviewContainer}>
					{isInsufficientBalance ? <LancaAdd /> : alert}
					<Separator />
				</div>
			</div>
		</animated.div>
	)
}
