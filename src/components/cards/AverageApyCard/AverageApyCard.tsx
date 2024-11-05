import { useEffect, useState } from 'react'
import { LineChartCard } from '../LineChartCard/LineChartCard'
import classNames from './AverageApyCard.module.pcss'
import type { ChartData } from '../../../types/utils'
import { fetchFees } from '../../../api/concero/fetchFees'
import { getUniqueChatData, groupDataByWeeks } from '../../../utils/charts'

export const AverageApyCard = () => {
	const [apyData, setApyData] = useState<ChartData[]>([])
	const [commonApyValue, setCommonApyValue] = useState<number>(0)

	const getTotalVolume = async () => {
		// TODO: you throw an error out of this function and don't even catch it!
		const fees = await fetchFees()

		const chartData = fees.map(fee => {
			const apyOnFeeFormula = fee.percentReturned * 365.25

			return {
				time: fee.timestamp * 1000,
				value: apyOnFeeFormula,
			}
		})

		const weeklyAverageData = groupDataByWeeks(getUniqueChatData(chartData))

		setCommonApyValue(weeklyAverageData[weeklyAverageData.length - 2].value)
		setApyData(weeklyAverageData)
	}

	useEffect(() => {
		// TODO: unhandled promise rejection!!!!
		getTotalVolume()
	}, [])

	return (
		<LineChartCard
			className={classNames.averageApyCard}
			titleCard="Average APY"
			data={apyData}
			commonValue={`${commonApyValue.toFixed(4)}%`}
		/>
	)
}
