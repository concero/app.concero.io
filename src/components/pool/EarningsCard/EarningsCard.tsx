import { ChartCard } from '../../cards/LineChartCard/ChartCard'
import classNames from './EarningsCard.module.pcss'
import { useEffect, useState } from 'react'
import type { ChartData } from '../../../types/utils'
import { fetchFees } from '../../../api/concero/pool/fetchFees'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { groupDataByDays } from '../../../utils/charts'
import { UserActions } from '../UserActions/UserActions'
import { PoolCard } from '../PoolCard/PoolCard'
import { toLocaleNumber } from '../../../utils/formatting'

const timeFilters = createTimeFilters()

export const EarningsCard = () => {
	const [earningsData, setEarningsData] = useState<ChartData[]>([])
	const [commonValue, setCommonValue] = useState<number>(0)
	const [activeFilter, setActiveFilter] = useState(timeFilters[2])

	const getTotalVolume = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const totalFees = fees.reduce((acc, fee) => {
			return acc + fee.percentReturned
		}, 0)

		setCommonValue(totalFees)

		const chartData = fees
			.filter(fee => {
				const feeTime = fee.timestamp
				const { startTime, endTime } = activeFilter

				return (!startTime || feeTime >= startTime) && (!endTime || feeTime <= endTime)
			})
			.map(fee => {
				return {
					time: fee.timestamp * 1000,
					value: fee.percentReturned,
				}
			})

		setEarningsData(groupDataByDays(chartData))
	}

	useEffect(() => {
		void getTotalVolume()
	}, [activeFilter])

	const footer = (
		<div className={classNames.footer}>
			<div className={classNames.poolButtons}>
				<PoolCard depositButtonClasses={classNames.button} withdrawalButtonClasses={classNames.button} />
			</div>

			<UserActions />
		</div>
	)

	return (
		<ChartCard
			className={classNames.earnings}
			titleCard="Earnings"
			subtitle="Earnings from all time"
			filterItems={timeFilters}
			activeItem={activeFilter}
			setActiveItem={setActiveFilter}
			data={earningsData}
			commonValue={`$${toLocaleNumber(commonValue, 2)}`}
			footer={footer}
		/>
	)
}
