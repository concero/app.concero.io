import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { groupDataByWeeks } from '../../../utils/charts'
import type { Fee } from '../../../api/concero/types'
import type { ChartData } from '../../../types/utils'
import { ChartCard } from '../LineChartCard/ChartCard'
import classNames from '../TotalVolumeCard/TotalVolumeCard.module.pcss'
import { toLocaleNumber } from '../../../utils/formatting'

type Size = 'small' | 'medium'

interface Props {
	fees: Fee[]
	title?: string
	isLoading: boolean
	withFilter?: boolean
	height?: number
	size?: Size
	className?: string
}

const REWARDS_DESCRIPTION =
	"The pool receives a fee of 0.1% of the transaction amount for each cross-chain transaction executed using the pool's liquidity. These fees are shared proportionally between all LP providers in the pool."

export const RewardsChartCard = ({
	fees,
	isLoading,
	withFilter = true,
	height,
	className = '',
	title = 'Rewards',
	size = 'medium',
}: Props) => {
	const timeFilters = useMemo(() => createTimeFilters(), [])
	const [volumeData, setVolumeData] = useState<ChartData[]>([])
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])
	const [commonValue, setCommonValue] = useState<string>()

	const getTotalVolume = useCallback(async () => {
		if (!Array.isArray(fees)) {
			console.error('Invalid fees data provided')
			return
		}

		try {
			const chartData = fees
				.filter(fee => {
					const feeTime = fee.timestamp
					const { startTime, endTime } = activeFilter

					return (!startTime || feeTime >= startTime) && (!endTime || feeTime <= endTime)
				})
				.map(fee => ({
					time: fee.timestamp * 1000,
					value: fee.feeMade,
				}))

			const totalValue = chartData.reduce((acc, item) => acc + item.value, 0)

			setCommonValue('$' + toLocaleNumber(totalValue))
			setVolumeData(groupDataByWeeks(chartData))
		} catch (error) {
			console.error('Error processing fee data:', error)
			setVolumeData([])
			setCommonValue('$0')
		}
	}, [fees, activeFilter])

	useEffect(() => {
		if (!fees?.length) return
		void getTotalVolume()
	}, [getTotalVolume, fees])

	const filterProps = useMemo(
		() =>
			withFilter
				? {
						filterItems: timeFilters,
						activeItem: activeFilter,
						setActiveItem: setActiveFilter,
					}
				: {},
		[withFilter, timeFilters, activeFilter],
	)

	const sizeValue = size === 'small' ? 'S' : 'M'

	return (
		<ChartCard
			description={REWARDS_DESCRIPTION}
			isLoading={isLoading}
			className={`${classNames.totalVolumeCard} ${className}`.trim()}
			titleCard={title}
			data={volumeData}
			commonValue={commonValue}
			isBar={true}
			{...filterProps}
			height={height}
			size={sizeValue}
		/>
	)
}
