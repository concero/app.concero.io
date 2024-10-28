import { LineChartCard } from '../LineChartCard/LineChartCard'
import classNames from './TotalVolumeCard.module.pcss'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useEffect, useState } from 'react'
import { fetchFees } from '../../../api/concero/fetchFees'
import { type ChartData } from '../../../types/utils'

const timeFilters = createTimeFilters()

export const TotalVolumeCard = () => {
	const [volumeData, setVolumeData] = useState<ChartData[]>([])
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])
	const [commonValue, setCommonValue] = useState<string>()

	const getTotalVolume = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const chartData = fees.map(fee => {
			return {
				time: fee.timestamp * 1000,
				value: fee.loanGivenOut,
			}
		})

		const totalValue = chartData.reduce((acc, item) => {
			return acc + item.value
		}, 0)

		const table = {}
		const uniqueChatData = chartData.filter(({ time }) => !table[time] && (table[time] = 1))

		setCommonValue(totalValue.toFixed(1))
		setVolumeData(uniqueChatData)
	}

	useEffect(() => {
		getTotalVolume()
	}, [activeFilter])

	return (
		<LineChartCard
			className={classNames.totalVolumeCard}
			titleCard="Volume"
			filterItems={timeFilters}
			activeItem={activeFilter}
			setActiveItem={setActiveFilter}
			data={volumeData}
			commonValue={commonValue}
		/>
	)
}
