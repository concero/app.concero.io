import classNames from './RouteDetailsModal.module.pcss'
import { CardModal } from '../../../../modals/CardModal/CardModal'
import { type StandardRoute } from '../../../../../types/StandardRoute'
import { useTranslation } from 'react-i18next'
import { StepCard } from '../RouteCard/StepCard/StepCard'

interface RouteDetailsModalProps {
	isOpen: boolean
	setIsOpen: (param: boolean) => void
	selectedRoute: StandardRoute
}

export function RouteDetailsModal({ isOpen, setIsOpen, selectedRoute }: RouteDetailsModalProps) {
	const { t } = useTranslation()

	return (
		<CardModal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title={t('swapCard.routeDetails')}
			className={classNames.modalBg}
		>
			<div className={classNames.container}>
				{selectedRoute.steps?.map((step, index) => (
					<StepCard key={index.toString()} innerSteps={step} index={index} />
				))}
			</div>
		</CardModal>
	)
}
