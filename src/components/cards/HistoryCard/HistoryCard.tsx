import { FC } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import { fromNow } from '../../../utils/formatting'

interface HistoryCardProps {}

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
export const HistoryCard: FC<HistoryCardProps> = () => (
  <div className="card f1">
    <CardHeader title="History" />
    <Table data={historyItems} columns={columns} />
  </div>
)
