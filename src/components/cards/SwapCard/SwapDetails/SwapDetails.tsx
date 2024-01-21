import { type FC, useRef, useState } from 'react'
import classNames from './SwapDetails.module.pcss'
import { Modal } from '../../../modals/Modal/Modal'
import { RouteButton } from './RouteButton/RouteButton'
import { RouteCard } from '../../RouteCard/RouteCard'
import { type SwapDetailsProps } from '../types'
import { action, category } from '../../../../constants/tracking'
import { trackEvent } from '../../../../hooks/useTracking'
import { type StandardRoute } from '../../../../types/StandardRoute'
import { useTranslation } from 'react-i18next'
import { animated, useSpring } from '@react-spring/web'
import { easeQuadInOut } from 'd3-ease'

export const SwapDetails: FC<SwapDetailsProps> = ({ swapState, setSelectedRoute }) => {
	const { t } = useTranslation()
	const { routes, selectedRoute } = swapState
	const [isSelectRouteModalVisible, setIsSelectRouteModalVisible] = useState<true | false>(false)

	const containerRef = useRef()

	const containerAnimation = useSpring({
		height: selectedRoute ? 20 : 0,
		config: { duration: 200, easing: easeQuadInOut },
	})

	const handleSelectRoute = (id: string) => {
		void trackEvent({
			action: action.SelectRoute,
			category: category.SwapCard,
			label: 'route_selected',
			data: { routeId: id },
		})
		setSelectedRoute(routes.find((route: StandardRoute) => route.id === id))
	}

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
				<Modal title="Select route" show={isSelectRouteModalVisible} setShow={setIsSelectRouteModalVisible}>
					<div className={classNames.routeCardsContainer}>
						{routes?.length
							? routes.map((route: StandardRoute) => (
									<div key={route.id}>
										<RouteCard route={route} isSelected={selectedRoute.id === route.id} onClick={handleSelectRoute} />
									</div>
							  ))
							: null}
					</div>
				</Modal>
			</div>
		</animated.div>
	)
}
