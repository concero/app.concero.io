import { useEffect, useState, useMemo, useCallback } from 'react'
import { ChartCard } from '../../cards/ChartCard/ChartCard'
import classNames from './AverageApyCard.module.pcss'
import type { ChartData } from '../../../types/utils'
import { getUniqueChatData, groupDataByWeeks } from '../../../utils/charts'
import { type Fee } from '../../../api/concero/types'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useGetLiquidity } from '../poolScripts/useGetLiquidity'
import { toLocaleNumber } from '../../../utils/formatting'

const timeFilters = createTimeFilters()

interface Props {
	fees: Fee[]
	isLoading: boolean
}

const apyDescription =
	'APY (Annual Percentage Yield) is calculated on the basis of the average fee earned by the pool in the previous week, extrapolated for the year.'

export const AverageApyCard = ({ fees, isLoading }: Props) => {
	const { poolLiquidity, isLoading: isLiquidityLoading } = useGetLiquidity()
	const [apyData, setApyData] = useState<ChartData[]>([])
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])
	const [commonValue, setCommonValue] = useState<string>('')

	const filteredFeeData = useMemo(() => {
		return fees
			.filter(fee => {
				const feeTime = fee.timestamp
				const { startTime, endTime } = activeFilter
				return (!startTime || feeTime >= startTime) && (!endTime || feeTime <= endTime)
			})
			.map(fee => ({
				time: fee.timestamp * 1000,
				value: fee.feeMade,
			}))
	}, [fees, activeFilter])

	const handleAPY = useCallback(async () => {
		try {
			const groupedWeeklyFees = groupDataByWeeks(getUniqueChatData(filteredFeeData))

			if (groupedWeeklyFees.length < 2) {
				console.warn('Not enough data to calculate APY')
				return
			}

			const weeklyApyData = groupedWeeklyFees.map((week, index) => {
				if (index === 0) {
					return {
						time: week.time,
						value: 0,
					}
				}
				const previousWeekFees = groupedWeeklyFees[index - 1].value
				const apy = poolLiquidity !== 0 ? ((previousWeekFees * 52) / poolLiquidity) * 100 : Infinity
				return {
					time: week.time,
					value: apy,
				}
			})

			const previousWeekFees = groupedWeeklyFees[groupedWeeklyFees.length - 2].value
			const apy = poolLiquidity !== 0 ? ((previousWeekFees * 52) / poolLiquidity) * 100 : Infinity

			if (apy === Infinity) {
				setCommonValue('Loading...')
			} else {
				setCommonValue(toLocaleNumber(apy).toString())
			}
			setApyData(weeklyApyData)
		} catch (error) {
			console.error('Error calculating APY:', error)
		}
	}, [filteredFeeData, poolLiquidity])

	useEffect(() => {
		if (!fees.length || isLiquidityLoading) return
		void handleAPY()
	}, [fees, activeFilter, handleAPY, isLiquidityLoading])

	return (
		<ChartCard
			description={apyDescription}
			isLoading={isLoading || isLiquidityLoading || commonValue === 'Loading...'}
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
