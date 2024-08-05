import { useEffect, useState } from 'react'
import { Card } from '../Card/Card'
import classNames from './ProjectedEarningsCard.module.pcss'
import ReactSlider from 'react-slider'
import dayjs from 'dayjs'
import { getStartOfToday } from '../../../utils/chartTimeFilters'
import { fetchFees } from '../../../api/concero/fetchFees'

interface ProjectedEarningsProps {
	rate: number
	deposit: number
}

export const ProjectedEarningsCard = ({ deposit }: ProjectedEarningsProps) => {
	const [numOfWeek, setNumOfWeek] = useState(0)
	const [totalFees, setTotalFees] = useState(0)

	const getFeesToday = async () => {
		const now = dayjs().valueOf() / 1000
		const startOfDay = getStartOfToday()

		const feesToday = await fetchFees(startOfDay, now)

		const totalFeesSum = feesToday.reduce((acc, fee) => {
			return acc + fee.percentReturned
		}, 0)

		setTotalFees(totalFeesSum / 100)
	}

	useEffect(() => {
		getFeesToday()
	}, [])

	// депозит * (1 + totalFeesSum(daily)) ^ кол-во дней
	const earnValue = deposit * (1 + 0.0013) ** (7 * numOfWeek)

	return (
		<Card className={`cardConvex ${classNames.projectedEarningsCard}`}>
			<div>
				<h4 className="body4">Projected earnings</h4>
				<h2>{earnValue.toFixed(2)} USDC</h2>
				<p className="body1">{numOfWeek === 0 ? 'Current total' : `${numOfWeek} week`}</p>
			</div>

			<ReactSlider
				onChange={(value: number) => {
					setNumOfWeek(value)
				}}
				className={classNames.slider}
				marks
				min={1}
				max={52}
				renderThumb={props => <div {...props} className={classNames.thumb} />}
			/>
		</Card>
	)
}
