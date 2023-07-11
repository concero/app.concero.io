import { FC } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { Tag } from '../../tags/Tag/Tag'

export interface HoldingsCardProps {}

export const holdingsColumns = [
  {
    columnTitle: 'Token',
    cellComponent: ({ token }) => <CryptoSymbol name={token.name} symbol={token.symbol} />,
  },
  {
    columnTitle: 'Amount',
    cellComponent: ({ amount }) => <p>{amount}</p>,
  },
  {
    columnTitle: 'Value',
    cellComponent: ({ value_usd }) => (
      <p>
        $
        {value_usd}
      </p>
),
  },
  {
    columnTitle: 'Last 24h',
    cellComponent: ({ last_24h }) => (
      <Tag
        leftIcon={{
          name: last_24h > 0 ? 'ArrowUpRight' : 'ArrowDownRight',
          iconProps: { size: 18 },
        }}
        color={last_24h > 0 ? 'green' : 'red'}
      >
        {last_24h}
        %
      </Tag>
    ),
  },
]
export const holdingsItems = [
  {
    token: {
      symbol: 'SOL',
      name: 'Solana',
    },
    amount: '540',
    value_usd: '540',
    value_btc: '0.0001',
    last_24h: -4.5,
  },
  {
    token: {
      symbol: 'BTC',
      name: 'Bitcoin',
    },
    amount: '20',
    value_usd: '5420',
    value_btc: '0.0001',
    last_24h: 53.5,
  },
]

export const HoldingsCard: FC<HoldingsCardProps> = () => (
  <div className="card">
    <CardHeader title="Holdings" />
    <Table items={holdingsItems} columns={holdingsColumns} />
  </div>
)
