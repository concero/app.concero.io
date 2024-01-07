import { type FC } from 'react'
import classNames from './DetailsList.module.pcss'

interface DetailsListProps {
	items: Item[]
}

interface Item {
	title: string
	value: string
}

export const DetailsList: FC<DetailsListProps> = ({ items }) => (
	<div className={classNames.container}>
		{items.map((item: Item, index: number) => (
			<div key={index.toString()} className={classNames.rowContainer}>
				<p className="body1">{item.title}</p>
				<p className="body1">{item.value}</p>
			</div>
		))}
	</div>
)
