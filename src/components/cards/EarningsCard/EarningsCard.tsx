import { LineChartCard } from '../LineChartCard/LineChartCard'
import classNames from './EarningsCard.module.pcss'
import { useEffect, useState } from 'react'
import type { ChartData } from '../../../types/utils'
import { fetchFees } from '../../../api/concero/fetchFees'
import { createTimeFilters } from '../../../utils/chartTimeFilters'

const timeFilters = createTimeFilters()

export const EarningsCard = () => {
	const [earningsData, setEarningsData] = useState<ChartData[]>([])
	const [commonValue, setCommonValue] = useState<number>(0)
	const [activeFilter, setActiveFilter] = useState(timeFilters[0])

	const getTotalVolume = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const totalApy = fees.reduce((acc, fee) => {
			return acc + fee.percentReturned
		}, 0)

		setCommonValue(totalApy)

		const chartData = fees.map(fee => {
			return {
				time: fee.timestamp * 1000,
				value: fee.percentReturned,
			}
		})

		const table = {}
		const uniqueChatData = chartData.filter(({ time }) => !table[time] && (table[time] = 1))

		setEarningsData(uniqueChatData)
	}

	useEffect(() => {
		getTotalVolume()
	}, [activeFilter])

	return (
		<LineChartCard
			className={classNames.earnings}
			titleCard="Earnings"
			filterItems={timeFilters}
			activeItem={activeFilter}
			setActiveItem={setActiveFilter}
			data={earningsData}
			commonValue={`${commonValue.toFixed(1)} USDC`}
		/>
	)
}
