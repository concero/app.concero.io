import { IconClock, IconPigMoney } from '@tabler/icons-react'
import classNames from './RouteCard.module.pcss'
import { colors } from '../../../constants/colors'
import { type Step } from '../../../types/StandardRoute'
import { secondsConverter } from '../../../utils/formatting'

interface AdditionalInfoTagProps {
	title: string
	type: 'gasUsd' | 'gas' | 'time'
	getColor: (key: string) => string
	isBestRoute: boolean
}

function AdditionalInfoTag({ title, type, getColor, isBestRoute }: AdditionalInfoTagProps) {
	const RenderedIcon = type === 'time' ? IconClock : IconPigMoney
	const subtitle = `${type === 'gasUsd' ? '$' : ''}${type === 'time' ? secondsConverter(Number(title)) : title}`

	return (
		<div className={classNames.additionalInfoTag}>
			<RenderedIcon size="1rem" color={isBestRoute ? colors.primary.light : colors.grey.medium} />
			<h5 className={`${classNames.textSubtitle} ${getColor('text')}`}>{subtitle}</h5>
		</div>
	)
}

export const renderAdditionalInfo = (isRoutesCollapsed: boolean, step: Step, isBestRoute: boolean, getColor: (key?: string) => string | undefined) => (
	<div>
		{!isRoutesCollapsed ? (
			<div style={{ flexDirection: 'row', gap: 10 }}>
				<AdditionalInfoTag title={step.tool.estimated_execution_time_seconds.toString()} type="time" getColor={getColor} isBestRoute={isBestRoute} />
				{step.tool.gas_usd ? (
					<AdditionalInfoTag title={step.tool.gas_usd as string} type="gasUsd" getColor={getColor} isBestRoute={isBestRoute} />
				) : step.tool.gas ? (
					<AdditionalInfoTag title={`${step.tool.gas[0].amount} ${step.tool.gas[0].asset.symbol}`} type="gas" getColor={getColor} isBestRoute={isBestRoute} />
				) : null}
			</div>
		) : null}
	</div>
)
