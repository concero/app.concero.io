import { ChartCard } from '../../cards/LineChartCard/ChartCard'
import classNames from './EarningsCard.module.pcss'
import { useEffect, useState } from 'react'
import type { ChartData } from '../../../types/utils'
import { fetchFees } from '../../../api/concero/pool/fetchFees'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { groupDataByDays } from '../../../utils/charts'
import { Button } from '../../buttons/Button/Button'
import { UserActions } from '../UserActions/UserActions'
import { useAccount } from 'wagmi'
import { PoolCard } from '../PoolCard/PoolCard'

const timeFilters = createTimeFilters()

export const EarningsCard = () => {
	const { address } = useAccount()

	const [earningsData, setEarningsData] = useState<ChartData[]>([])
	const [commonValue, setCommonValue] = useState<number>(0)
	const [activeFilter, setActiveFilter] = useState(timeFilters[0])

	const getTotalVolume = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const totalFees = fees.reduce((acc, fee) => {
			return acc + fee.percentReturned
		}, 0)

		setCommonValue(totalFees)

		const chartData = fees.map(fee => {
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
			<div className="row gap-sm">
				<PoolCard />

				<Button className={classNames.button} size="lg" variant="secondaryColor">
					Withdrawal
				</Button>
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
			commonValue={`$${commonValue.toFixed(1)}`}
			footer={address && footer}
		/>
	)
}
