import { FC, useContext, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'
import classNames from './HistoryCard.module.pcss'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { handleFetchTransactionHistory } from './handlers'

interface HistoryCardProps {}

function ToggleHistoyButton(historyType) {
  return (
    <Button
      variant="subtle"
      rightIcon={{ name: 'ChevronDown', iconProps: { size: '0.85rem', color: colors.grey.medium } }}
      size="sm"
    >
      <p className="body1">{historyType}</p>
    </Button>
  )
}

export const HistoryCard: FC<HistoryCardProps> = () => {
  // const [historyType, setHistoryType] = useState<'All' | 'Own'>('All')
  const [isLoading, setIsLoading] = useState(false)
  const [historyItems, setHistoryItems] = useState([])
  const { selection } = useContext(SelectionContext)

  useEffect(() => {
    const interval = handleFetchTransactionHistory(setIsLoading, setHistoryItems, selection)

    return async () => {
      clearInterval(await interval)
    }
  }, [selection.historyCard])

  // const ButtonWithPopover = WithPopover(
  //   () => ToggleHistoyButton(historyType),
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
      <CardHeader title="History">{/* <ButtonWithPopover /> */}</CardHeader>
      <div className={classNames.tableContainer}>
        <Table items={historyItems} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  )
}
