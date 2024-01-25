import { type StandardRoute, type Step } from '../../../../../types/StandardRoute'
import classNames from './RouteCard.module.pcss'
import { IconChevronDown, IconClock, IconCoins, IconHandClick } from '@tabler/icons-react'
import { roundNumberByDecimals, secondsConverter } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import { useRef, useState } from 'react'
import { StepCard } from './StepCard/StepCard'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'

interface RouteCardProps {
	route: StandardRoute
	isSelected?: boolean
	onSelect?: (route: StandardRoute) => void
}

export function RouteCard({ route, isSelected, onSelect }: RouteCardProps) {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
	const stepsContainerRef = useRef<HTMLDivElement>()
	const { to, transaction_time_seconds, cost, steps } = route

	const stepsContainerAnimation = useSpring({
		height: isCollapsed ? 0 : stepsContainerRef.current?.scrollHeight,
		config: { duration: 200, easing: easeQuadInOut },
	})

	const chevronAnimation = useSpring({
		transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
		config: { duration: 200, easing: easeQuadInOut },
	})

	return (
		<div
			className={`${classNames.container} ${isSelected ? classNames.selected : ''}`}
			onClick={() => {
				onSelect && onSelect(route)
			}}
		>
			<div className={classNames.header}>
				<div className={classNames.rowContainer}>
					<h4>${roundNumberByDecimals(to.token.amount_usd)}</h4>
					<p className={`body1 ${classNames.tokenAmount}`}>{`${to.token.amount} ${to.token.symbol}`}</p>
				</div>
				<div className={classNames.rowContainer}>
					<Button
						leftIcon={
							<animated.div style={chevronAnimation}>
								<IconChevronDown size={16} color={'var(--color-text-secondary)'} />
							</animated.div>
						}
						variant={'black'}
						size={'sq-xs'}
						onClick={e => {
							e.stopPropagation()
							setIsCollapsed((prev: boolean) => !prev)
						}}
					/>
				</div>
			</div>
			<div className={classNames.rowContainer}>
				<div className={classNames.tagContainer}>
					<IconCoins size={16} color={'var(--color-text-secondary)'} />
					<p className={'body3'}>{`$${cost.total_gas_usd}`}</p>
				</div>
				<div className={classNames.tagContainer}>
					<IconClock size={16} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{`${secondsConverter(Number(transaction_time_seconds))}`}</p>
				</div>
				<div className={classNames.tagContainer}>
					<IconHandClick size={16} color={'var(--color-text-secondary)'} />
					<p className={'body1'}>{steps?.length ?? 1}</p>
				</div>
			</div>
			<animated.div style={stepsContainerAnimation}>
				<div className={classNames.stepsContainer} ref={stepsContainerRef}>
					{steps?.map((innerSteps: Step[], index) => {
						return <StepCard key={index.toString()} innerSteps={innerSteps} index={index} />
					})}
				</div>
			</animated.div>
		</div>
	)
}
