import { FC } from 'react'
import { CardHeader } from '../CardHeader/CardHeader.tsx'
import { Table } from '../../layout/Table/Table.tsx'
import { columns } from './columns.tsx'
import { fromNow } from '../../../utils/formatting.ts'

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
export const HistoryCard: FC<HistoryCardProps> = () => {
  return (
    <div className="card f1">
      <CardHeader title={'History'}></CardHeader>
      <Table data={historyItems} columns={columns} />
    </div>
  )
}
