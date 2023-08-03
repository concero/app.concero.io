import { FC, useContext, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import classNames from './HistoryCard.module.pcss'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { getTransactions } from './getTransactions'

interface HistoryCardProps {}

// function ToggleHistoryButton(historyType) {
//   return (
//     <Button
//       variant="subtle"
//       rightIcon={{ name: 'ChevronDown', iconProps: { size: '0.85rem', color: colors.grey.medium } }}
//       size="sm"
//     >
//       <p className="body1">{historyType}</p>
//     </Button>
//   )
// }

export const HistoryCard: FC<HistoryCardProps> = () => {
  // const [historyType, setHistoryType] = useState<'All' | 'Own'>('All')
  const [isLoading, setIsLoading] = useState(false)
  const [historyItems, setHistoryItems] = useState([])
  const { selection } = useContext(SelectionContext)

  useEffect(() => {
    const fetchTransactions = () => {
      if (!selection.historyCard.from.token.symbol || !selection.historyCard.to.token.symbol) return
      getTransactions(selection.swapCard, historyItems, setHistoryItems, setIsLoading)
    }

    // Call once on mount
    fetchTransactions()

    // Set up interval for every 60 seconds
    const intervalId = setInterval(fetchTransactions, 60 * 1000)

    // Clear interval on unmount
    return () => clearInterval(intervalId)
  }, [selection.historyCard.from.token.symbol, selection.historyCard.to.token.symbol])

  // const ButtonWithPopover = WithPopover(
  //   () => ToggleHistoryButton(historyType),
  //   MenuPopover,
  //   {
  //     items: [
  //       { title: 'All', onClick: () => setHistoryType('All') },
  //       { title: 'Own', onClick: () => setHistoryType('Own') },
  //     ],
  //   },
  //   'click',
  // )

  return (
    <div className={`${classNames.container} card`}>
      <CardHeader title="Transactions">{/* <ButtonWithPopover /> */}</CardHeader>
      <Table items={historyItems} columns={columns} isLoading={isLoading} />
    </div>
  )
}
