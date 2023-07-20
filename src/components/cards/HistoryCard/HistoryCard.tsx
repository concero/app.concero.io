import { FC, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { columns } from './columns'
import { fromNow } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'
import { MenuPopover } from '../../overlays/MenuPopover/MenuPopover'
import { WithPopover } from '../../wrappers/WithPopover'
import { get } from '../../../api/clientProxy'

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
  const [historyType, setHistoryType] = useState<'All' | 'Own'>('All')
  const url = 'https://io.dexscreener.com/dex/log/amm/uniswap/all/bsc/0x5dc30Bb8D7F02eFEf28f7E637D17Aea13Fa96906?q=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

  const fetchHistory = async () => {
    const response = await get(url)
    console.log(response)
  }

  const ButtonWithPopover = WithPopover(
    () => ToggleHistoyButton(historyType),
    MenuPopover,
    {
      items: [
        { title: 'All', onClick: () => setHistoryType('All') },
        { title: 'Own', onClick: () => setHistoryType('Own') },
      ],
    },
    'click',
  )

  return (
    <div className="card f1">
      <CardHeader title="History">
        <ButtonWithPopover />
      </CardHeader>
      <Table items={historyItems} columns={columns} />
    </div>
  )
}
