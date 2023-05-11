import { FC } from 'react'
import { CardHeader } from './CardHeader'
import { Table } from '../layout/Table/Table'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { colors } from '../../constants/colors'

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
]
const historyColumns = [
  {
    column_title: 'From / to',
    data: (item) => item,
    column_type: 'tx_from_to',
  },
  {
    column_title: 'Value',
    data: (item) => item.value,
    column_type: 'plain_text',
  },
  {
    column_title: 'When',
    data: (item) => item.created_at,
    column_type: 'plain_text',
    style: { color: colors.text.secondary },
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
