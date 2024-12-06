import classNames from './ChartCard.module.pcss'
import { Card } from '../Card/Card'
import { Chart } from '../../layout/Charts/Chart/Chart'
import { type SelectItem } from '../../../utils/chartTimeFilters'
import { type ChartData } from '../../../types/utils'
import { type Dispatch, type SetStateAction } from 'react'
import { Button } from '../../buttons/Button/Button'
import { BarChart } from '../../layout/Charts/BarChart/BarChart'
import { Loader } from '../../layout/Loader/Loader'
import { SkeletonLoader } from '../../layout/SkeletonLoader/SkeletonLoader'
import { InfoTooltip } from '../../wrappers/InfoTooltip/InfoTooltip'

export interface BarChartCardProps {
	description?: string
	titleCard: string
	subtitle?: string
	filterItems?: SelectItem[]
	activeItem?: SelectItem
	setActiveItem?: Dispatch<SetStateAction<SelectItem>>
	commonValue: string | number | undefined
	data: ChartData[]
	className?: string
	footer?: React.ReactNode
	isBar?: boolean
	height?: number
	size?: 'S' | 'M'
	isLoading: boolean
}

export const ChartCard = ({
	description,
	titleCard,
	subtitle,
	activeItem,
	setActiveItem,
	filterItems,
	commonValue,
	data,
	className,
	footer,
	isBar = false,
	height,
	size,
	isLoading,
}: BarChartCardProps) => {
	const isSmall = size === 'S'

	const chart = isBar ? <BarChart height={height} data={data} /> : <Chart data={data} />

	const title =
		commonValue && isSmall ? (
			<h3 className={classNames.value}>{commonValue}</h3>
		) : (
			<h2 className={classNames.value}>{commonValue}</h2>
		)

	return (
		<Card className={`${className} jsb`}>
			<div>
				<div className={classNames.header}>
					<div className="row gap-sm ac">
						<h4 className={classNames.title}>{titleCard}</h4>
						{description && <InfoTooltip description={description} tooltipId={titleCard} />}
					</div>
					<div className="row gap-xs">
						{setActiveItem &&
							filterItems?.map(filterItem => {
								const isActive = filterItem.value === activeItem?.value
								return (
									<Button
										key={filterItem.value}
										onClick={() => {
											setActiveItem(filterItem)
										}}
										variant={`${isActive ? 'secondary' : 'tetrary'}`}
										size="sm"
									>
										{filterItem.title}
									</Button>
								)
							})}
					</div>
				</div>

				{isLoading ? <SkeletonLoader className={classNames.value} width={150} height={32} /> : title}

				{subtitle && isLoading ? <SkeletonLoader width={105} height={20} /> : <p>{subtitle}</p>}
			</div>

			{isLoading ? (
				<div className="w-full h-full ac jc">
					<Loader variant="neutral" />
				</div>
			) : (
				chart
			)}

			{footer}
		</Card>
	)
}
