import { type FC, useRef, useState } from 'react'
import classNames from './SwapDetails.module.pcss'
import { RouteButton } from './RouteButton/RouteButton'
import { type SwapDetailsProps } from '../types'
import { action, category } from '../../../../constants/tracking'
import { trackEvent } from '../../../../hooks/useTracking'
import { useTranslation } from 'react-i18next'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'
import { SelectRouteModal } from './SelectRouteModal/SelectRouteModal'

export const SwapDetails: FC<SwapDetailsProps> = ({ swapState, swapDispatch }) => {
	const { t } = useTranslation()
	const { selectedRoute } = swapState
	const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<true | false>(false)
	const containerRef = useRef<HTMLDivElement>()

	const containerAnimation = useSpring({
		height: selectedRoute ? 30 : 0,
		config: { duration: 200, easing: easeQuadInOut },
	})

	return (
		<animated.div style={containerAnimation}>
			<div className={classNames.swapDetailsContainer} ref={containerRef}>
				<p className={'body3'}>{t('swapCard.route')}</p>
				<RouteButton
					selectedRoute={selectedRoute}
					onClick={() => {
						void trackEvent({ action: action.OpenRoutesModal, category: category.SwapCard, label: 'route_modal_opened' })
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
		</animated.div>
	)
}
