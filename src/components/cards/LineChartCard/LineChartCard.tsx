import classNames from './LineChartCard.module.pcss'
import { Card } from '../Card/Card'
import { Chart } from '../../layout/Chart/Chart'
import Dropdown, { type SelectItem } from '../../layout/DropdownSelect/DropdownSelect'

const mockData = [
	{
		time: '2024-09-20',
		value: 2000,
	},
	{
		time: '2024-09-21',
		value: 5000,
	},
	{
		time: '2024-09-22',
		value: 7200,
	},
	{
		time: '2024-09-23',
		value: 23243,
	},
	{
		time: '2024-09-24',
		value: 434,
	},
	{
		time: '2024-09-25',
		value: 34324,
	},
	{
		time: '2024-09-26',
		value: 14,
	},
	{
		time: '2024-09-27',
		value: 25,
	},
	{
		time: '2024-09-28',
		value: 18,
	},
]

export interface BarChartCardProps {
	titleCard: string
	filterItems?: SelectItem[]
	commonValue?: string
	className?: string
}

export const LineChartCard = ({ titleCard, filterItems, commonValue, className = '' }: BarChartCardProps) => (
	<Card className={`${classNames.container} ${className} cardConvex`}>
		<div className={classNames.header}>
			<div>
				<h4 className="body4">{titleCard}</h4>
				{commonValue && <h2>{commonValue}</h2>}
			</div>
			{filterItems && filterItems.length > 0 && <Dropdown items={filterItems} />}
		</div>
		<Chart data={mockData} />
	</Card>
)
