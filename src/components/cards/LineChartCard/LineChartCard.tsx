import classNames from './LineChartCard.module.pcss'
import { Card } from '../Card/Card'
import { Chart } from '../../layout/Chart/Chart'
import Dropdown from '../../layout/DropdownSelect/DropdownSelect'
import { type SelectItem } from '../../../constants/timeFilters'
import { type ChartData } from '../../../types/utils'

export interface BarChartCardProps {
	titleCard: string
	filterItems: SelectItem[]
	activeItem: SelectItem
	setActiveItem: (item: SelectItem) => void
	showCommonValue: boolean
	data: ChartData[]
	className?: string
}

export const LineChartCard = ({
	titleCard,
	activeItem,
	setActiveItem,
	filterItems,
	showCommonValue,
	data,
	className,
}: BarChartCardProps) => {
	return (
		<Card className={`${classNames.container} ${className} cardConvex`}>
			<div className={classNames.header}>
				<div>
					<h4 className="body4">{titleCard}</h4>
					{showCommonValue && <h2>0</h2>}
				</div>
				{filterItems && filterItems.length > 0 && (
					<Dropdown activeItem={activeItem} setActiveItem={setActiveItem} items={filterItems} />
				)}
			</div>
			<Chart data={data} />
		</Card>
	)
}
