import { colors } from '../../../constants/colors.ts'
import {
  getSentimentBgColorByText,
  getSentimentFgColorByText,
  getSentimentIconByText,
  Tag,
} from '../../tags/Tag/Tag.tsx'
import Icon from '../../Icon.tsx'
import { fromNow, getHostname } from '../../../utils/formatting.ts'

export const columns = [
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
