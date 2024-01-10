import { type FC } from 'react'
import { Highlight } from '../../tags/Highlight/Highlight'
import classNames from './HighlightsCard.module.pcss'

export interface HighlightsCardProps {}

const items = [
	{
		id: '1',
		title: 'Best performer',
		value: 'ADA',
		last_24h: '2.55',
	},
	{
		id: '2',
		title: 'Worst performer',
		value: 'SOL',
		last_24h: '0.55',
	},
	{
		id: '3',
		title: 'Highlight',
		value: 'ADA',
		last_24h: '5.54',
	},
	{
		id: '4',
		title: 'Highlight',
		value: 'SOL',
		last_24h: '-0.54',
	},
]

const item = {
	id: '0',
	title: 'Total portfolio value',
	value: '$ 1,540.00',
	valueSecondary: '0.0001 BTC',
	last_24h: '2.55',
}

export const HighlightsCard: FC<HighlightsCardProps> = () => (
	<div className={`card ${classNames.highlightsContainer}`}>
		<Highlight size="lg" item={item} />
		<div className={classNames.separator} />
		<div className={classNames.bottomGridContainer}>
			{items.map(item => (
				<Highlight key={item.id} item={item} />
			))}
		</div>
	</div>
)
