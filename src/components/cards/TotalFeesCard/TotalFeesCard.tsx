import { Card } from '../Card/Card'
import Dropdown from '../../layout/DropdownSelect/DropdownSelect'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useEffect, useState } from 'react'
import { fetchFees } from '../../../api/concero/fetchFees'

const timeFilters = createTimeFilters()

export const TotalFeesCard = () => {
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])
	const [totalFees, setTotalFees] = useState<string>('0')

	const getTotalFees = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)

		const result = fees.reduce((acc, fee) => {
			return acc + fee.feeMade
		}, 0)

		setTotalFees(result.toFixed(2))
	}

	useEffect(() => {
		getTotalFees()
	}, [activeFilter])

	return (
		<Card className="cardConvex">
			<div className="row jsb w-full">
				<div className="gap-sm">
					<h4 className="body4">Total fees</h4>
					<h2>${totalFees} USDC</h2>
				</div>
				<Dropdown setActiveItem={setActiveFilter} activeItem={activeFilter} items={timeFilters} />
			</div>
		</Card>
	)
}
