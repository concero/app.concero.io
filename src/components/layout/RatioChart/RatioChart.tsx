import { type FC } from 'react'
import { RatioItem } from './RatioItem'
import classNames from './RatioChart.module.pcss'

interface RatioChartProps {
	data: {
		total: number
		items: Array<{
			name: string
			value: number
			color: string
		}>
	}
}

export const RatioChart: FC<RatioChartProps> = ({ data }) => (
	<div className={classNames.container}>
		{data.items.map((item, index) => (
			<RatioItem key={index.toString()} item={item} total={data.total} />
		))}
	</div>
)
