import { ChartCard } from '../LineChartCard/ChartCard'
import classNames from './TotalVolumeCard.module.pcss'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useEffect, useState } from 'react'
import { type ChartData } from '../../../types/utils'
import { type Fee } from '../../../api/concero/types'
import { toLocaleNumber } from '../../../utils/formatting'

const timeFilters = createTimeFilters()

interface Props {
	fees: Fee[]
	isLoading: boolean
}

const description = 'Total volume of cross-chain transactions using the liquidity of the pool'

export const TotalVolumeCard = ({ fees, isLoading }: Props) => {
	const [volumeData, setVolumeData] = useState<ChartData[]>([])
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])
	const [commonValue, setCommonValue] = useState<string>()

	const getTotalVolume = async () => {
		let totalValue = 0
		const chartData = fees.reduce((acc, fee) => {
			const feeTime = fee.timestamp
			const { startTime, endTime } = activeFilter

			if ((!startTime || feeTime >= startTime) && (!endTime || feeTime <= endTime)) {
				const feeValue = {
					time: fee.timestamp * 1000,
					value: fee.loanGivenOut,
				}

				totalValue += feeValue.value

				return [...acc, feeValue]
			}
			return acc
		}, [])

		setCommonValue('$' + toLocaleNumber(totalValue))
		setVolumeData(chartData)
	}

	useEffect(() => {
		if (!fees) return

		void getTotalVolume().catch(e => {
			console.error(e)
		})
	}, [activeFilter, fees])

	return (
		<ChartCard
			description={description}
			isLoading={isLoading}
			className={classNames.totalVolumeCard}
			titleCard="Total volume"
			filterItems={timeFilters}
			activeItem={activeFilter}
			setActiveItem={setActiveFilter}
			data={volumeData}
			commonValue={commonValue}
		/>
	)
}
