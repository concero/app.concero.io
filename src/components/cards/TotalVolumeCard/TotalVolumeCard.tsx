import { LineChartCard } from '../LineChartCard/LineChartCard'
import classNames from './TotalVolumeCard.module.pcss'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useEffect, useState } from 'react'
import { fetchFees } from '../../../api/concero/fetchFees'
import { type ChartData } from '../../../types/utils'

const timeFilters = createTimeFilters()

export const TotalVolumeCard = () => {
	const [volumeData, setVolumeData] = useState<ChartData[]>([])
	const [activeFilter, setActiveFilter] = useState(timeFilters[0])
	const [commonValue, setCommonValue] = useState<string>()

	useEffect(() => {
		const value = volumeData.reduce((acc, item) => acc + item.value, 0)
		setCommonValue(value.toFixed(1))
	}, [volumeData])

	const getTotalVolume = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const chartData = fees.map(fee => {
			return {
				time: fee.timestamp * 1000,
				value: fee.loanGivenOut,
			}
		})

		const table = {}
		const uniqueChatData = chartData.filter(({ time }) => !table[time] && (table[time] = 1))

		setVolumeData(uniqueChatData)
	}

	useEffect(() => {
		getTotalVolume()
	}, [activeFilter])

	return (
		<LineChartCard
			className={classNames.totalVolumeCard}
			titleCard="Total Volume"
			filterItems={timeFilters}
			activeItem={activeFilter}
			setActiveItem={setActiveFilter}
			data={volumeData}
			commonValue={`${commonValue} USDC`}
		/>
	)
}
