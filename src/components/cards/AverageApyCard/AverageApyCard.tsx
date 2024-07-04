import { useState } from 'react'
import { timeFilters } from '../../../constants/timeFilters'
import { LineChartCard } from '../LineChartCard/LineChartCard'
import classNames from './AverageApyCard.module.pcss'
import { getAverageApy, mockDataForWeek } from '../../screens/PoolScreen/poolScripts/getAverageApy'

// const mockUserUsdc = 1000
// const mockTotalSupplyUsdc = 3000
const mockNominalRate = 3

export const AverageApyCard = () => {
	const [activeFilter, setActiveFilter] = useState(timeFilters[0])

	const nominalRate = mockNominalRate
	const averageApy = (1 + nominalRate / 365) ** 365 - 1
	const commonAvgValue = `${averageApy.toFixed(2)} %`

	const getAveragePerWeek = getAverageApy(mockDataForWeek)

	console.log(getAveragePerWeek)

	return (
		<LineChartCard
			className={classNames.averageApyCard}
			titleCard="Average APY"
			filterItems={timeFilters}
			activeItem={activeFilter}
			setActiveItem={setActiveFilter}
			data={getAveragePerWeek}
			showCommonValue={true}
		/>
	)
}
