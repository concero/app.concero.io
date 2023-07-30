import { colors } from '../../../constants/colors'
import Icon from '../../Icon'
import { truncate } from '../../../utils/formatting'
import classNames from './NewsCard.module.pcss'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'

export const columns = [
  {
    columnTitle: 'Title',
    cellComponent: (item) => <p style={{ color: colors.grey.light }}>{truncate(item.title, 90)}</p>,
  },
  {
    columnTitle: 'Sentiment',
    cellComponent: (item) => {
      return (
        <div className={classNames.cellComponentContainer}>
          <div className="row ac gap-xs">
            <Icon name="Clock" color={colors.text.secondary} size={18} />
            <p style={{ color: colors.text.secondary }}>{item.created_at}</p>
          </div>
        </div>
      )
    },
  },
  {
    columnTitle: 'Sentiment',
    cellComponent: (item) => (
      <div className="row ac gap-xs">
        <Icon name="Link" color={colors.text.secondary} size={18} />
        <a href={item.url} target="_blank" rel="noreferrer">
          <p style={{ color: colors.text.secondary }} className={classNames.truncate}>
            {item.source.title}
          </p>
        </a>
      </div>
    ),
  },
]

export const modalColumns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (item) => <CryptoSymbol src={item.logoURI} symbol={truncate(item.symbol, 7)} />,
  },
  {
    columnTitle: 'Name',
    cellComponent: (item) => <p className="body1">{truncate(item.name, 20)}</p>,
  },
]
