import { type FC, useContext, useEffect } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { getTransactions } from './getTransactions'
import { TransactionDetailsModal } from './TransactionDetailsModal'
import { Card } from '../Card/Card'
import { useHistoryReducer } from './historyReducer'
import { columns } from './columns'

import classNames from './HistoryCard.module.pcss'

import { FetchingFallback } from '../../wrappers/WithErrorBoundary'
import { DataContext } from '../../../hooks/DataContext/DataContext'

interface HistoryCardProps {}

export const HistoryCard: FC<HistoryCardProps> = () => {
	const { selection } = useContext(SelectionContext)
	const { getTokens } = useContext(DataContext)
	const [state, dispatch] = useHistoryReducer(selection)
	const fetchTransactions = () => {
		if (!selection.historyCard.from.token.symbol || !selection.historyCard.to.token.symbol) return
		getTransactions(selection.swapCard, state, dispatch, getTokens)
	}
	useEffect(() => {
		fetchTransactions()
		const intervalId = setInterval(fetchTransactions, 120 * 1000)
		return () => {
			clearInterval(intervalId)
		}
	}, [selection.historyCard.from.token.symbol, selection.historyCard.to.token.symbol])

	if (state.error) return FetchingFallback(fetchTransactions)
	return (
		<Card className={classNames.container}>
			<CardHeader title="Transactions" />
			<Table
				items={state.items}
				columns={columns(
					data => dispatch({ type: 'SET_MODAL_DATA', payload: data }),
					isOpen => dispatch({ type: 'SET_MODAL_OPEN', payload: isOpen }),
				)}
				isLoading={state.historyIsLoading}
			/>
			<TransactionDetailsModal isOpen={state.modalIsOpen} setIsOpen={isOpen => dispatch({ type: 'SET_MODAL_OPEN', payload: isOpen })} data={state.modalData} />
		</Card>
	)
}
