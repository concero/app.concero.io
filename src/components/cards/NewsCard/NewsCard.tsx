import { FC } from 'react'
import { CardHeader } from '../CardHeader/CardHeader.tsx'
import { Table } from '../../layout/Table/Table.tsx'
import {
  getSentimentBgColorByText,
  getSentimentFgColorByText,
  getSentimentIconByText,
  Tag,
} from '../../tags/Tag/Tag.tsx'
import Icon from '../../Icon.tsx'
import { colors } from '../../../constants/colors.ts'
import { fromNow, getHostname } from '../../../utils/formatting.ts'
import classNames from './NewsCard.module.pcss'

interface NewsCardProps {}

const newsColumns = [
  {
    columnTitle: 'Title',
    cellComponent: (item) => <p style={{ color: colors.grey.light }}>{item.title}</p>,
  },
  {
    columnTitle: 'Sentiment',
    cellComponent: (item) => (
      <Tag
        fgColor={getSentimentFgColorByText(item.sentiment)}
        bgColor={getSentimentBgColorByText(item.sentiment)}
        leftIcon={getSentimentIconByText(item.sentiment)}>
        {item.sentiment}
      </Tag>
    ),
  },
  {
    columnTitle: 'Date',
    cellComponent: (item) => (
      <div className={'row ac gap-xs'}>
        <Icon name={'Calendar'} color={colors.text.secondary} size={18} />
        <p style={{ color: colors.text.secondary }}>{fromNow(item.created_at)}</p>
      </div>
    ),
  },
  {
    columnTitle: 'Source',
    headerStyle: { textAlign: 'right' },
    cellComponent: (item) => (
      <div className={'row ac gap-xs jfe'}>
        <Icon name={'Link'} color={colors.text.secondary} size={18} />
        <p style={{ color: colors.text.secondary }}>{getHostname(item.source_url)}</p>
      </div>
    ),
  },
]

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

export const NewsCard: FC<NewsCardProps> = () => {
  return (
    <div className={`${classNames.container} card`}>
      <CardHeader title={'News'}></CardHeader>
      <Table data={newsData} columns={newsColumns} isHeaderVisible={false} />
    </div>
  )
}
