import { type ITransactionCard } from '../types'
import { Button } from '../../../buttons/Button/Button'
import classNames from './TransactionItemCard.module.pcss'
import { truncateWallet } from '../../../../utils/formatting'

interface TransactionCardProps {
	item: ITransactionCard
}

export function TransactionItemCard({ item }: TransactionCardProps) {
	return (
		<Button size={'sq-sm'} variant={'black'}>
			<div className={classNames.container}>
				<div className={classNames.sideContainer}>
					<p className={`body1`}>{item.type}</p>
					<p className={`body1 ${classNames.subtitle}`}>{item.amount + ' ' + item.symbol}</p>
				</div>
				<div className={`${classNames.sideContainer} ${classNames.rightSide}`}>
					<p className={`body1`}>{item.timestamp}</p>
					<p className={`body1 ${classNames.subtitle}`}>{truncateWallet(item.contractAddress)}</p>
				</div>
			</div>
		</Button>
	)
}
