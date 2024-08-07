import { Card } from '../Card/Card'
import Dropdown from '../../layout/DropdownSelect/DropdownSelect'
import { createTimeFilters } from '../../../utils/chartTimeFilters'
import { useEffect, useState } from 'react'
import { fetchFees } from '../../../api/concero/fetchFees'

const timeFilters = createTimeFilters()

export const TotalTransactionsCard = () => {
	const [totalTransactions, setTotalTransactions] = useState(0)
	const [activeFilter, setActiveFilter] = useState(timeFilters[timeFilters.length - 1])

	const getTotalTransactions = async () => {
		const { startTime, endTime } = activeFilter
		const fees = await fetchFees(startTime, endTime)
		setTotalTransactions(fees.length)
	}

	useEffect(() => {
		getTotalTransactions()
	}, [activeFilter])

	return (
		<Card className="cardConvex f1">
			<div className="row jsb w-full">
				<div className="gap-sm">
					<h4 className="body4">Total Transactions</h4>
					<h2>{totalTransactions}</h2>
				</div>
				<Dropdown
					variant="fill"
					setActiveItem={setActiveFilter}
					activeItem={activeFilter}
					items={timeFilters}
				/>
			</div>
		</Card>
	)
}
