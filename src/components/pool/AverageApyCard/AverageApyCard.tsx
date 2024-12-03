import { useEffect, useState } from 'react'
import { ChartCard } from '../../cards/LineChartCard/ChartCard'
import classNames from './AverageApyCard.module.pcss'
import type { ChartData } from '../../../types/utils'
import { getUniqueChatData, groupDataByWeeks } from '../../../utils/charts'
import { type Fee } from '../../../api/concero/types'
import { createTimeFilters } from '../../../utils/chartTimeFilters'

const timeFilters = createTimeFilters()

interface Props {
	fees: Fee[]
	isLoading: boolean
}

const apyDescription =
	'APY (Annual Percentage Yield) is calculated on the basis of the average fee earned by the pool in the previous week, extrapolated for the year.'

export const AverageApyCard = ({ fees, isLoading }: Props) => {
	const [apyData, setApyData] = useState<ChartData[]>([])
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])
	const [commonValue, setCommonValue] = useState<string>('')

	const getTotalVolume = async () => {
		const chartData = fees
			.filter(fee => {
				const feeTime = fee.timestamp
				const { startTime, endTime } = activeFilter

				return (!startTime || feeTime >= startTime) && (!endTime || feeTime <= endTime)
			})
			.map(fee => {
				const apyOnFeeFormula = fee.percentReturned * 365.25

				return {
					time: fee.timestamp * 1000,
					value: apyOnFeeFormula,
				}
			})

		const weeklyAverageData = groupDataByWeeks(getUniqueChatData(chartData))

		setCommonValue(weeklyAverageData[weeklyAverageData.length - 2].value.toFixed(0))
		setApyData(weeklyAverageData)
	}

	useEffect(() => {
		if (!fees) return

		void getTotalVolume().catch(e => {
			console.error(e)
		})
	}, [fees, activeFilter])

	return (
		<ChartCard
			description={apyDescription}
			isLoading={isLoading}
			className={classNames.averageApyCard}
			setActiveItem={setActiveFilter}
			activeItem={activeFilter}
			filterItems={timeFilters}
			titleCard="Pool APY"
			subtitle="Total APY"
			data={apyData}
			commonValue={`${commonValue}%`}
		/>
	)
}
