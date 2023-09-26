import { DetailsList } from '../../layout/DetailsList/DetailsList'
import classNames from './DetailsCard.module.pcss'

const items = [
	{
		title: 'Your pool share',
		value: '0.05%',
	},
	{
		title: 'UNI liquidity',
		value: '12’599’333 UNI',
	},
	{
		title: 'USDT liquidity',
		value: '3’049’251 ETH',
	},
	{
		title: 'Swap fee',
		value: '0.04%',
	},
]

export function DetailsCard() {
	return (
		<div className={classNames.container}>
			<h5 className="headerContainer">Details</h5>
			<DetailsList items={items} />
		</div>
	)
}
