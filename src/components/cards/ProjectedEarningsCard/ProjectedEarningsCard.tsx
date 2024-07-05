import { useState } from 'react'
import { Card } from '../Card/Card'
import classNames from './ProjectedEarningsCard.module.pcss'
import ReactSlider from 'react-slider'

interface ProjectedEarningsProps {
	rate: number
	deposit: number
}

export const ProjectedEarningsCard = ({ rate, deposit }: ProjectedEarningsProps) => {
	const [thumbState, setThumbState] = useState(1)

	const earnValue = deposit * (1 + rate) * (thumbState * 7)

	return (
		<Card className={`cardConvex ${classNames.projectedEarningsCard}`}>
			<div>
				<h4 className="body4">Projected earnings</h4>
				<h2>{earnValue.toFixed(2)} USDC</h2>
				<p className="body1">{thumbState === 1 ? 'Current total' : `${thumbState} week`}</p>
			</div>

			<ReactSlider
				onChange={(value: number) => {
					setThumbState(value)
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
