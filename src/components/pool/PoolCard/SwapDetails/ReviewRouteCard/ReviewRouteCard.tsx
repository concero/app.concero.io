import classNames from './ReviewRouteCard.module.pcss'
import { type SwapState } from '../../swapReducer/types'
import { useTranslation } from 'react-i18next'
import { type Step } from '../../../../../types/StandardRoute'
import { IconChevronRight } from '@tabler/icons-react'
import { ReviewRouteStepCard } from './ReviewRouteStepCard/ReviewRouteStepCard'
import { MainRouteInfoTags } from '../../../../tags/MainRouteInfoTags/MainRouteInfoTags'

interface ReviewRouteCardProps {
	swapState: SwapState
}

export function ReviewRouteCard({ swapState }: ReviewRouteCardProps) {
	const { t } = useTranslation()
	const { selectedRoute } = swapState

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
						<div key={index.toString()} className={classNames.rowContainer}>
							{index !== 0 ? <IconChevronRight size={18} color={'var(--color-text-secondary)'} /> : null}
							<ReviewRouteStepCard direction={steps[steps.length - 1].to} />
						</div>
					)
				})}
			</div>
			<div className={`${classNames.rowContainer}`}>
				<div className={classNames.tags}>
					<MainRouteInfoTags
						transactionTimeSeconds={selectedRoute?.transaction_time_seconds}
						totalGasUsd={selectedRoute?.cost.total_gas_usd}
						stepsLength={selectedRoute?.steps?.length}
					/>
				</div>
				<div className={classNames.footerTitleContainer}>
					<p className={'body1'}>{t('swapCard.clickToOpenDetails')}</p>
				</div>
			</div>
		</div>
	)
}
