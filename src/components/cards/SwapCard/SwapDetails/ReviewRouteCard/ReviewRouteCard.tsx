import classNames from './ReviewRouteCard.module.pcss'
import { type SwapState } from '../../swapReducer/types'
import { useTranslation } from 'react-i18next'
import { type Step } from '../../../../../types/StandardRoute'
import { IconChevronRight } from '@tabler/icons-react'
import { ReviewRouteStepCard } from './ReviewRouteStepCard/ReviewRouteStepCard'

interface ReviewRouteCardProps {
	swapState: SwapState
}

export function ReviewRouteCard({ swapState }: ReviewRouteCardProps) {
	const { t } = useTranslation()

	return (
		<div className={classNames.container}>
			<div className={classNames.header}>
				<p className={'body2'}>{t('swapCard.yourRoute')}</p>
			</div>
			<div className={classNames.routeStepsContainer}>
				{swapState.selectedRoute ? <ReviewRouteStepCard direction={swapState.selectedRoute?.from} /> : null}
				<IconChevronRight size={18} color={'var(--color-text-secondary)'} />
				{swapState.selectedRoute?.steps?.map((steps: Step[], index: number) => {
					return (
						<div className={classNames.rowContainer}>
							<ReviewRouteStepCard key={index.toString()} direction={steps[steps.length - 1].to} />
							{index < steps.length - 1 ? <IconChevronRight size={18} color={'var(--color-text-secondary)'} /> : null}
						</div>
					)
				})}
			</div>
		</div>
	)
}
