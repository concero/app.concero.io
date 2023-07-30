import { FC, useContext, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import classNames from './HistoryCard.module.pcss'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { fetchTransactions } from './handlers'

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
    if (!selection.historyCard.from.token.symbol || !selection.historyCard.to.token.symbol) return
    const interval = fetchTransactions(setIsLoading, setHistoryItems, selection)
    return async () => {
      clearInterval(await interval)
    }
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
    <div className="card f1" style={{ overflow: 'hidden' }}>
      <CardHeader title="Transactions">{/* <ButtonWithPopover /> */}</CardHeader>
      <div className={classNames.tableContainer}>
        <Table items={historyItems} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  )
}
