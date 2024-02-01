import { CardModal } from '../../../../modals/CardModal/CardModal'
import classNames from './SelectRouteModal.module.pcss'
import { type SwapAction, type SwapState } from '../../swapReducer/types'
import { type StandardRoute } from '../../../../../types/StandardRoute'
import { useTranslation } from 'react-i18next'
import { RouteCard } from '../RouteCard/RouteCard'
import { type Dispatch } from 'react'
import { trackEvent } from '../../../../../hooks/useTracking'
import { action, category } from '../../../../../constants/tracking'

interface SelectRouteModalProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

export function SelectRouteModal({ swapState, swapDispatch, isOpen, setIsOpen }: SelectRouteModalProps) {
	const { selectedRoute } = swapState
	const { t } = useTranslation()

	const handleSelect = (route: StandardRoute) => {
		swapDispatch({ type: 'SET_SELECTED_ROUTE', payload: route })
		setIsOpen(false)
		void trackEvent({
			action: action.SelectRoute,
			category: category.SwapCard,
			label: 'route_selected',
			data: { routeId: swapState.selectedRoute?.id },
		})
	}

	return (
		<CardModal isOpen={isOpen} setIsOpen={setIsOpen} title={t('swapCard.selectRoute')}>
			<div className={classNames.routesContainer}>
				{swapState.routes.map((route: StandardRoute) => {
					return (
						<RouteCard key={route.id} route={route} isSelected={selectedRoute?.id === route.id} onSelect={handleSelect} />
					)
				})}
			</div>
		</CardModal>
	)
}
