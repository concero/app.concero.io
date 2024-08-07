import { useEffect, useState } from 'react'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { LineChartCard } from '../LineChartCard/LineChartCard'
import classNames from './AverageApyCard.module.pcss'
import type { ChartData } from '../../../types/utils'
import { fetchFees } from '../../../api/concero/fetchFees'
import { getUniqueChatData } from '../../../utils/charts'

const timeFilters = createTimeFilters()

export const AverageApyCard = () => {
	const [apyData, setApyData] = useState<ChartData[]>([])
	const [commonApyValue, setCommonApyValue] = useState<number>(0)
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])

	const getTotalVolume = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const totalFeesSum = fees.reduce((acc, fee) => {
			return acc + fee.percentReturned
		}, 0)

		const apy = totalFeesSum * 365.25
		setCommonApyValue(apy)

		const chartData = fees.map(fee => {
			const apyOnFeeFormula = fee.percentReturned * 365.25

			return {
				time: fee.timestamp * 1000,
				value: apyOnFeeFormula,
			}
		})

		setApyData(getUniqueChatData(chartData))
	}

	useEffect(() => {
		getTotalVolume()
	}, [activeFilter])

	return (
		<LineChartCard
			className={classNames.averageApyCard}
			titleCard="Average APY"
			filterItems={timeFilters}
			activeItem={activeFilter}
			setActiveItem={setActiveFilter}
			data={apyData}
			commonValue={`${commonApyValue.toFixed(4)}%`}
		/>
	)
}
