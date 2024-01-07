import { type FC } from 'react'
import classNames from './RatioChart.module.pcss'

interface RatioItemProps {
	item: {
		name: string
		value: number
		color: string
	}
	total: number
}

export const RatioItem: FC<RatioItemProps> = ({ item, total }) => (
	<div
		className={classNames.item}
		style={{
			flex: `${item.value / total}`,
		}}
	>
		<div className={classNames.bar} style={{ backgroundColor: item.color }} />
		<div className={classNames.barTitle}>
			<h5>{`${(item.value / total) * 100}% ${item.name}`}</h5>
		</div>
	</div>
)
