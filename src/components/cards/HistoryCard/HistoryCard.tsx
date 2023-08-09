import { FC, useContext, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import classNames from './HistoryCard.module.pcss'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { getTransactions } from './getTransactions'
import { TransactionDetailsModal } from './TransactionDetailsModal'

interface HistoryCardProps {}

export const HistoryCard: FC<HistoryCardProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [historyItems, setHistoryItems] = useState([])
  const { selection } = useContext(SelectionContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState()

  useEffect(() => {
    const fetchTransactions = () => {
      if (!selection.historyCard.from.token.symbol || !selection.historyCard.to.token.symbol) return
      getTransactions(selection.swapCard, historyItems, setHistoryItems, setIsLoading)
    }
    fetchTransactions()
    const intervalId = setInterval(fetchTransactions, 60 * 1000)
    return () => clearInterval(intervalId)
  }, [selection.historyCard.from.token.symbol, selection.historyCard.to.token.symbol])

  return (
    <div className={`${classNames.container} card`}>
      <CardHeader title="Transactions" />
      <Table items={historyItems} columns={columns(setModalData, setIsModalOpen)} isLoading={isLoading} />
      <TransactionDetailsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} data={modalData} />
    </div>
  )
}
