import { FC, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import { fromNow } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'
import { MenuPopover } from '../../overlays/MenuPopover/MenuPopover'
import { WithPopover } from '../../wrappers/WithPopover'

interface HistoryCardProps {
}

const historyItems = [
  {
    from: 'SOL',
    to: 'USDT',
    type: 'buy',
    value: '540',
    created_at: fromNow('2021-10-10T12:00:00.000Z'),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: fromNow('2021-10-10T12:00:00.000Z'),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'buy',
    value: '540',
    created_at: fromNow('2021-10-10T12:00:00.000Z'),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: fromNow('2021-10-10T12:00:00.000Z'),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: fromNow('2021-10-10T12:00:00.000Z'),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'buy',
    value: '540',
    created_at: fromNow('2021-10-10T12:00:00.000Z'),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: fromNow('2021-10-10T12:00:00.000Z'),
  },
]
export const HistoryCard: FC<HistoryCardProps> = () => {
  const [historyType, setHistoryType] = useState<'All' | 'Own'>('All')
  const testButton = () => (
    <Button
      variant="subtle"
      rightIcon={{ name: 'ChevronDown', iconProps: { size: '0.85rem', color: colors.grey.medium } }}
      size="sm"
    >
      <p className="body1">{historyType}</p>
    </Button>
  )

  const ButtonWithPopover = WithPopover(testButton, MenuPopover, {
    items: [
      { title: 'All', onClick: () => setHistoryType('All') },
      { title: 'Own', onClick: () => setHistoryType('Own') },
    ],
  }, 'click')

  return (
    <div className="card f1">
      <CardHeader title="History">
        <ButtonWithPopover />
      </CardHeader>
      <Table data={historyItems} columns={columns} />
    </div>
  )
}
