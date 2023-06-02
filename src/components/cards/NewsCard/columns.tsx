import { colors } from '../../../constants/colors'
import { getSentimentColorByText, getSentimentIconByText, Tag } from '../../tags/Tag/Tag'
import Icon from '../../Icon'
import { fromNow, getHostname } from '../../../utils/formatting'

export const columns = [
  {
    columnTitle: 'Title',
    cellComponent: (item) => <p style={{ color: colors.grey.light }}>{item.title}</p>,
  },
  {
    columnTitle: 'Sentiment',
    cellComponent: (item) => (
      <Tag
        color={getSentimentColorByText(item.sentiment)}
        leftIcon={getSentimentIconByText(item.sentiment)}
      >
        {item.sentiment}
      </Tag>
    ),
  },
  {
    columnTitle: 'Date',
    cellComponent: (item) => (
      <div className="row ac gap-xs">
        <Icon name="Calendar" color={colors.text.secondary} size={18} />
        <p style={{ color: colors.text.secondary }}>{fromNow(item.created_at)}</p>
      </div>
    ),
  },
  {
    columnTitle: 'Source',
    headerStyle: { textAlign: 'right' },
    cellComponent: (item) => (
      <div className="row ac gap-xs jfe">
        <Icon name="Link" color={colors.text.secondary} size={18} />
        <p style={{ color: colors.text.secondary }}>{getHostname(item.source_url)}</p>
      </div>
    ),
  },
]
