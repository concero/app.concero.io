import { type FC, useEffect, useRef, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { Card } from '../Card/Card'
import classNames from './RouteCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { renderTags } from './renderTags'
import { renderSteps } from './renderSteps'
import { type RouteCardProps } from './types'
import { numberToFormatString, roundNumberByDecimals } from '../../../utils/formatting'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { action, category } from '../../../constants/tracking'
import { trackEvent } from '../../../hooks/useTracking'

export const RouteCard: FC<RouteCardProps> = ({ route, isSelected, onClick }) => {
	const stepsContainerRef = useRef(null)
	const isMobile = useMediaQuery('mobile')
	const [isRoutesCollapsed, setIsRoutesCollapsed] = useState(true)
	const [springProps, setSpringProps] = useSpring(() => ({ height: 'auto' }))

	const getTextColor = () => (isSelected ? classNames.bestText : '')
	const getIconColor = () => (isSelected ? 'var(--color-primary-400)' : 'var(--color-text-secondary)')

	const handleButtonClick = event => {
		event.stopPropagation()
		setIsRoutesCollapsed(!isRoutesCollapsed)
		trackEvent({ action: action.ToggleRouteCard, category: category.SwapCard, label: 'toggle_route', data: { isOpen: !isRoutesCollapsed } })
	}

	useEffect(() => {
		const height = isRoutesCollapsed ? 54 : stepsContainerRef.current.scrollHeight + 8
		setSpringProps({ height })
	}, [isRoutesCollapsed])

	return (
		<Card
			className={`${classNames.container} ${isSelected ? classNames.selectedCard : ''}`}
			onClick={() => {
				onClick(route.id)
			}}
		>
			<div className={classNames.cardHeader}>
				<div className={classNames.cardHeaderLeftSide}>
					{!isMobile ? <h4>Net value:</h4> : null}
					<h3>{`$${numberToFormatString(Number(route.to.token.amount_usd), 2, true)}`}</h3>
					<h3 className={classNames.subtitle}>{`${roundNumberByDecimals(Number(route.to.token.amount), 4)} ${route.to.token.symbol}`}</h3>
				</div>
				<Button
					variant="black"
					rightIcon={isRoutesCollapsed ? <IconChevronDown size={20} /> : <IconChevronUp size={20} />}
					size="sm"
					onClick={e => {
						handleButtonClick(e)
					}}
					className={isSelected ? classNames.bestButton : ''}
				/>
			</div>
			<animated.div className={classNames.stepsContainer} style={springProps} ref={stepsContainerRef}>
				{renderSteps(route, isRoutesCollapsed, setIsRoutesCollapsed, isSelected)}
			</animated.div>
			{renderTags(route, isSelected, getTextColor, getIconColor)}
		</Card>
	)
}
