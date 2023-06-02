import { FC } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { columns } from './columns'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'

interface NewsCardProps {}

const newsData = [
  {
    title: 'Solana (SOL) price prediction: can the coin reach $200?',
    sentiment: 'bullish',
    created_at: '2021-10-10T12:00:00.000Z',
    source_url: 'https://cointelegraph.com/abcd',
  },
  {
    title: 'Solana (SOL) price prediction: can the coin reach $200?',
    sentiment: 'bearish',
    created_at: '2021-10-10T12:00:00.000Z',
    source_url: 'https://cointelegraph.com/abcd',
  },
  {
    title: 'Solana (SOL) price prediction: can the coin reach $200?',
    sentiment: 'neutral',
    created_at: '2021-10-10T12:00:00.000Z',
    source_url: 'https://cointelegraph.com/abcd',
  },
  {
    title: 'Solana (SOL) price prediction: can the coin reach $200?',
    sentiment: 'neutral',
    created_at: '2021-10-10T12:00:00.000Z',
    source_url: 'https://cointelegraph.com/abcd',
  },
  {
    title: 'Solana (SOL) price prediction: can the coin reach $200?',
    sentiment: 'neutral',
    created_at: '2021-10-10T12:00:00.000Z',
    source_url: 'https://cointelegraph.com/abcd',
  },
  {
    title: 'Solana (SOL) price prediction: can the coin reach $200?',
    sentiment: 'neutral',
    created_at: '2021-10-10T12:00:00.000Z',
    source_url: 'https://cointelegraph.com/abcd',
  },
]

export const NewsCard: FC<NewsCardProps> = () => (
  <div className={`${classNames.container} card`}>
    <CardHeader title="News">
      <Button
        variant={'subtle'}
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}
        size={'sm'}
      >
        <CryptoSymbol name={'BNB'} symbol={'BNB'} />
      </Button>
    </CardHeader>
    <Table items={newsData} columns={columns} isHeaderVisible={false} />
  </div>
)
