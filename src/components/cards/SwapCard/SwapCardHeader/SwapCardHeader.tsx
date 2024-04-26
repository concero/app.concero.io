import classNames from './SwapCardHeader.module.pcss'
import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { IconChevronLeft, IconDots } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'
import { type Dispatch, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getCardTitleByStatus } from '../handlers/getCardTitleByStatus'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'
import { Toggle } from '../../../layout/Toggle/Toggle'
import { useFeatureFlagVariantKey } from 'posthog-js/react'

interface SwapCardHeaderProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
}

export function SwapCardHeader({ swapState, swapDispatch }: SwapCardHeaderProps) {
	const { stage, isTestnet } = swapState
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [titleAnimationWidth, setTitleAnimationWidth] = useState<number>(0)
	const variant = useFeatureFlagVariantKey('ccip-testnet-whitelist')
	const isToggleTestnetButtonVisible = variant === 'whitelisted'
	const isReviewStage = stage === SwapCardStage.review
	const isInputStage = stage === SwapCardStage.input

	const titleTransition = useSpring({
		x: isReviewStage ? titleAnimationWidth : 0,
		width: '100%',
		config: { duration: 200, easing: easeQuadInOut },
	})

	useLayoutEffect(() => {
		if (containerRef.current) {
			setTitleAnimationWidth(containerRef.current.scrollWidth / 2 - 74)
		}
	}, [containerRef.current?.scrollWidth])

	useEffect(() => {
		if (!isToggleTestnetButtonVisible) return
		swapDispatch({ type: 'TOGGLE_TESTNET' })
	}, [isToggleTestnetButtonVisible])

	return (
		<div
			className={`${classNames.container} ${isInputStage ? classNames.spaceBetweenContainer : ''}`}
			ref={containerRef}
		>
			{isReviewStage ? (
				<Button
					variant="black"
					size="sq-xs"
					onClick={() => {
						swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.input })
					}}
					leftIcon={<IconChevronLeft size={16} color={'var(--color-text-secondary)'} />}
				/>
			) : null}
			<animated.div style={titleTransition}>
				<h5 className={'cardHeaderTitle'}>{getCardTitleByStatus(swapState.stage)}</h5>
			</animated.div>
			{isInputStage ? (
				<div className={classNames.settingsContainer}>
					{isToggleTestnetButtonVisible ? (
						<div className={classNames.toggleTestnetContainer}>
							<h5>Testnet</h5>
							<Toggle
								isChecked={isTestnet}
								onChange={() => {
									swapDispatch({ type: 'TOGGLE_TESTNET' })
								}}
							/>
						</div>
					) : null}
					<Button
						variant="black"
						size="sq-xs"
						onClick={() => {
							swapDispatch({ type: 'TOGGLE_SETTINGS_MODAL_OPEN' })
						}}
						leftIcon={<IconDots size={16} color={'var(--color-text-secondary)'} />}
					/>
				</div>
			) : null}
		</div>
	)
}
