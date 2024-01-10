import classNames from './TransactionsCard.module.pcss'
import { TransactionItemCard } from './TransactionItemCard/TransactionItemCard'
import { type ITransactionCard } from './types'

const items: ITransactionCard[] = [
	{
		type: 'Contract interaction',
		timestamp: '2021-08-20 12:00:00',
		amount: '0.03',
		symbol: 'ETH',
		contractAddress: '0x70E73f067a1fC9FE6D53151bd271715811746d3a',
	},
]

export function TransactionsCard() {
	return (
		<div className={classNames.container}>
			{items.map((item: ITransactionCard, index: number) => (
				<TransactionItemCard key={index.toString()} item={item} />
			))}
		</div>
	)
}
