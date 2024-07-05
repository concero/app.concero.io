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
	const [activeFilter, setActiveFilter] = useState(timeFilters[0])

	const getTotalVolume = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const totalApy = fees.reduce((acc, fee) => {
			return acc + fee.percentReturned
		}, 0)

		setCommonApyValue((totalApy * 365.25) / 100)

		const chartData = fees.map(fee => {
			const apyOnFeeFormula = (1 + fee.percentReturned / 365.25) ** 365.25 - 1

			return {
				time: fee.timestamp * 1000,
				value: apyOnFeeFormula * 100,
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
			commonValue={`${commonApyValue.toFixed(1)}%`}
		/>
	)
}
