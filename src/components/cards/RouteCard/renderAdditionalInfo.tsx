import { IconClock, IconPigMoney } from '@tabler/icons-react'
import classNames from './RouteCard.module.pcss'
import { colors } from '../../../constants/colors'
import { Step } from '../../../types/StandardRoute'
import { secondsConverter } from '../../../utils/formatting'

function AdditionalInfoTag({ title, type, getColor, isBestRoute }: { title: string; type: 'gasUsd' | 'gas' | 'time'; getColor: () => string; isBestRoute: boolean }) {
	const RenderedIcon = type === 'time' ? IconClock : IconPigMoney

	return (
		<div className={classNames.additionalInfoTag}>
			<RenderedIcon size="1rem" color={isBestRoute ? colors.primary.light : colors.grey.medium} />
			<h5 className={`${classNames.textSubtitle} ${getColor('text')}`}>{`${type === 'gasUsd' ? '$' : ''}${type === 'time' ? secondsConverter(title) : title}`}</h5>
		</div>
	)
}

export const renderAdditionalInfo = (isRoutesCollapsed: boolean, step: Step, isBestRoute: boolean, getColor: () => string | undefined) => (
	<div>
		{!isRoutesCollapsed ? (
			<div
				style={{
					flexDirection: 'row',
					gap: 10,
				}}
			>
				<AdditionalInfoTag title={step.tool.estimated_execution_time_seconds} type="time" getColor={getColor} isBestRoute={isBestRoute} />
				{step.tool.gas_usd ? (
					<AdditionalInfoTag title={step.tool.gas_usd} type="gasUsd" getColor={getColor} isBestRoute={isBestRoute} />
				) : step.tool.gas ? (
					<AdditionalInfoTag title={step.tool.gas} type="gas" getColor={getColor} isBestRoute={isBestRoute} />
				) : null}
			</div>
		) : null}
	</div>
)
