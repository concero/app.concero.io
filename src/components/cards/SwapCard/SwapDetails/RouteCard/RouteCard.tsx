import { type StandardRoute, type Step } from '../../../../../types/StandardRoute'
import classNames from './RouteCard.module.pcss'
import { IconChevronDown } from '@tabler/icons-react'
import { roundNumberByDecimals } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import { useRef, useState } from 'react'
import { StepCard } from './StepCard/StepCard'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'
import { Tag } from '../../../../tags/Tag/Tag'
import { MainRouteInfoTags } from '../../../../tags/MainRouteInfoTags/MainRouteInfoTags'

interface RouteCardProps {
	route: StandardRoute
	isSelected?: boolean
	onSelect?: (route: StandardRoute) => void
}

const getTag = (
	tag: string,
): {
	title: string
	color: 'recommended' | 'cheapest' | 'fastest'
} => {
	const tagTitles: Record<string, string> = {
		RECOMMENDED: 'Best',
		CHEAPEST: 'Cheapest',
		FASTEST: 'Fastest',
		SAFEST: 'Safest',
	}

	const tagClassNames: Record<string, 'recommended' | 'cheapest' | 'fastest'> = {
		RECOMMENDED: 'recommended',
		CHEAPEST: 'cheapest',
		FASTEST: 'fastest',
		SAFEST: 'fastest',
	}

	return {
		title: tagTitles[tag] ?? tag,
		color: tagClassNames?.[tag] ?? 'cheapest',
	}
}

export function RouteCard({ route, isSelected, onSelect }: RouteCardProps) {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
	const stepsContainerRef = useRef<HTMLDivElement | null>(null)
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
			<div className={classNames.spaceBetweenContainer}>
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
			<div className={classNames.spaceBetweenContainer}>
				<MainRouteInfoTags
					totalGasUsd={cost.total_gas_usd}
					stepsLength={steps?.length}
					transactionTimeSeconds={transaction_time_seconds}
				/>
				{route.tags?.[0] ? (
					<Tag color={getTag(route.tags?.[0]).color} size={'sm'}>
						<p style={{ color: 'inherit' }}>{getTag(route.tags?.[0]).title}</p>
					</Tag>
				) : null}
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
