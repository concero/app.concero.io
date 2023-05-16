import { FC } from 'react'
import { CardHeader } from './CardHeader/CardHeader.tsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { colors } from '../../constants/colors'
import { TxFromTo } from '../layout/Table/TxFromTo'
import { Table } from '../layout/Table/Table'

dayjs.extend(relativeTime)

interface HistoryCardProps {}

const historyItems = [
  {
    from: 'SOL',
    to: 'USDT',
    type: 'buy',
    value: '540',
    created_at: dayjs().to(dayjs('2021-10-10T12:00:00.000Z')),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: dayjs().to(dayjs('2021-10-10T12:00:00.000Z')),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'buy',
    value: '540',
    created_at: dayjs().to(dayjs('2021-10-10T12:00:00.000Z')),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: dayjs().to(dayjs('2021-10-10T12:00:00.000Z')),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: dayjs().to(dayjs('2021-10-10T12:00:00.000Z')),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'buy',
    value: '540',
    created_at: dayjs().to(dayjs('2021-10-10T12:00:00.000Z')),
  },
  {
    from: 'SOL',
    to: 'USDT',
    type: 'sell',
    value: '350',
    created_at: dayjs().to(dayjs('2021-10-10T12:00:00.000Z')),
  },
]
const historyColumns = [
  {
    columnTitle: 'From / to',
    cellComponent: (item) => <TxFromTo item={item} />,
  },
  {
    columnTitle: 'Value',
    cellComponent: (item) => <p style={{ color: colors.grey.light }}>${item.value}</p>,
  },
  {
    columnTitle: 'When',
    headerStyle: { textAlign: 'right' },
    cellComponent: (item) => <p style={{ color: colors.text.secondary, textAlign: 'end' }}>{item.created_at}</p>,
  },
]
export const HistoryCard: FC<HistoryCardProps> = () => {
  return (
    <div className="card f1">
      <CardHeader title={'History'}></CardHeader>
      <Table data={historyItems} columns={historyColumns} />
    </div>
  )
}
