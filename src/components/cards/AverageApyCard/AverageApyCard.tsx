import { type SelectItem } from '../../layout/DropdownSelect/DropdownSelect'
import { LineChartCard } from '../LineChartCard/LineChartCard'
import classNames from './AverageApyCard.module.pcss'

const filterItems: SelectItem[] = [
	{
		title: 'Today',
		value: 'today',
	},
	{
		title: 'This mounth',
		value: 'this mounth',
	},
	{
		title: 'This week',
		value: 'this week',
	},
	{
		title: 'All-time',
		value: 'all-time',
	},
]

export function AverageApyCard() {
	return (
		<LineChartCard
			className={classNames.averageApyCard}
			titleCard="Average APY"
			filterItems={filterItems}
			commonValue="25 %"
		/>
	)
}
