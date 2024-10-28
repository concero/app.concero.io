import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useEffect, useState } from 'react'
import { groupDataByWeeks } from '../../../utils/charts'
import type { Fee } from '../../../api/concero/types'
import type { ChartData } from '../../../types/utils'
import { ChartCard } from '../LineChartCard/ChartCard'
import classNames from '../TotalVolumeCard/TotalVolumeCard.module.pcss'

const timeFilters = createTimeFilters()

interface Props {
	fees: Fee[]
	title: string
	isLoading: boolean
	withFilter?: boolean
	height?: number
	size?: 'S' | 'M'
}

export const RewardsCard = ({ fees, isLoading, withFilter = true, height, title = 'Rewards', size = 'M' }: Props) => {
	const [volumeData, setVolumeData] = useState<ChartData[]>([])
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])
	const [commonValue, setCommonValue] = useState<string>()

	const getTotalVolume = async () => {
		const chartData = fees
			.filter(fee => {
				const feeTime = fee.timestamp
				const { startTime, endTime } = activeFilter

				return (!startTime || feeTime >= startTime) && (!endTime || feeTime <= endTime)
			})
			.map(fee => {
				return {
					time: fee.timestamp * 1000,
					value: fee.feeMade,
				}
			})

		const totalValue = chartData.reduce((acc, item) => {
			return acc + item.value
		}, 0)

		setCommonValue('$' + totalValue.toFixed(0))
		setVolumeData(groupDataByWeeks(chartData))
	}

	useEffect(() => {
		if (!fees) return

		void getTotalVolume()
	}, [activeFilter, fees])

	let filterProps = {}

	if (withFilter) {
		filterProps = {
			filterItems: timeFilters,
			activeItem: activeFilter,
			setActiveItem: setActiveFilter,
		}
	}

	return (
		<ChartCard
			isLoading={isLoading}
			className={classNames.totalVolumeCard}
			titleCard={title}
			data={volumeData}
			commonValue={commonValue}
			isBar={true}
			{...filterProps}
			height={height}
			size={size}
		/>
	)
}
