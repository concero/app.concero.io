import classNames from './LineChartCard.module.pcss'
import { Card } from '../Card/Card'
import { Chart } from '../../layout/Chart/Chart'
import Dropdown from '../../layout/DropdownSelect/DropdownSelect'
import { type SelectItem } from '../../../utils/chartTimeFilters'
import { type ChartData } from '../../../types/utils'
import { type Dispatch, type SetStateAction } from 'react'

export interface BarChartCardProps {
	titleCard: string
	filterItems: SelectItem[]
	activeItem: SelectItem
	setActiveItem: (item: Dispatch<SetStateAction<SelectItem>>) => void
	commonValue: string
	data: ChartData[]
	className?: string
}

export const LineChartCard = ({
	titleCard,
	activeItem,
	setActiveItem,
	filterItems,
	commonValue,
	data,
	className,
}: BarChartCardProps) => {
	// TODO do groped Data

	return (
		<Card className={`${classNames.container} ${className} cardConvex`}>
			<div className={classNames.header}>
				<div>
					<h4 className="body4">{titleCard}</h4>
					{commonValue && <h2>{commonValue}</h2>}
				</div>
				{filterItems && filterItems.length > 0 && (
					<Dropdown activeItem={activeItem} setActiveItem={setActiveItem} items={filterItems} />
				)}
			</div>
			<Chart data={data} />
		</Card>
	)
}
