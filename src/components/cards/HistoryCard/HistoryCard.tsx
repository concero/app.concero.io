import { FC, useContext, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'
import { fetchTransactionHistory } from '../../../api/dexscreener/fetchTransactionHistory'
import classNames from './HistoryCard.module.pcss'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { fetchPairs } from '../../../api/dexscreener/fetchPairs'

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
  const [tokensPair, setTokensPair] = useState(null)
  const { selection } = useContext(SelectionContext)

  const getTokensPair = async () => {
    const { pairs } = await fetchPairs(
      `${selection.historyCard.from.token.symbol}/${selection.historyCard.to.token.symbol}`,
    )
    if (!pairs) throw new Error('No pairs found')
    setTokensPair(pairs[0])
  }

  const getTransactionHistory = async () => {
    const response = await fetchTransactionHistory(tokensPair)
    setHistoryItems(response)
  }

  useEffect(() => {
    setIsLoading(true)
    getTokensPair()
  }, [selection])

  useEffect(() => {
    if (!tokensPair) return
    getTransactionHistory()
      .then(() => {
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        throw e
        return
      })

    const interval = setInterval(getTransactionHistory, 10000)
    return () => clearInterval(interval)
  }, [tokensPair])

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
