import classNames from './LineChartCard.module.pcss'
import { Card } from '../Card/Card'
import { Chart } from '../../layout/Chart/Chart'
import { type SelectItem } from '../../../utils/chartTimeFilters'
import { type ChartData } from '../../../types/utils'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { groupDataByDays } from '../../../utils/charts'
import { Button } from '../../buttons/Button/Button'

export interface BarChartCardProps {
	titleCard: string
	filterItems?: SelectItem[]
	activeItem?: SelectItem
	setActiveItem?: (item: Dispatch<SetStateAction<SelectItem>>) => void
	commonValue: string | number
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
	const [convertedData, setConvertedData] = useState<ChartData[]>(data)

	useEffect(() => {
		const newData: ChartData[] = groupDataByDays(data)

		setConvertedData(newData)
	}, [data, activeItem])

	return (
		<Card className={`${className} cardConvex`}>
			<div className={classNames.header}>
				<div>
					<h4 className={classNames.title}>{titleCard}</h4>
				</div>
				{filterItems && activeItem && setActiveItem && (
					<div className="row gap-xs">
						<Button variant="secondary" size="sm">
							M
						</Button>
						<Button variant="tetrary" size="sm">
							3M
						</Button>
						<Button variant="tetrary" size="sm">
							All
						</Button>
					</div>
				)}
			</div>
			{commonValue && <h2 className={classNames.value}>${commonValue}</h2>}
			<Chart data={convertedData} />
		</Card>
	)
}
