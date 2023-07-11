import React from 'react'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import { colors } from '../../../constants/colors'
import { getSentimentColorByText, getSentimentIconByText, Tag } from '../../tags/Tag/Tag'
import Icon from '../../Icon'
import { fromNow, getDomain } from '../../../utils/formatting'
import classNames from './NewsCard.module.pcss'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

export const columns = [
  {
    columnTitle: 'Title',
    cellComponent: (item) => <p style={{ color: colors.grey.light }}>{item.title}</p>,
  },
  {
    columnTitle: 'Sentiment',
    cellComponent: (item) => {
      const isDesktop = useMediaQuery('mobile')

      if (!isDesktop) {
        dayjs.extend(updateLocale)
        dayjs.updateLocale('en', {
          relativeTime: {
            future: 'in %s',
            past: '%s',
            s: 'just now',
            m: 'a min ago',
            mm: '%dm ago',
            h: 'an hour ago',
            hh: '%dh ago',
            d: 'a day ago',
            dd: '%dd ago',
            M: 'a month ago',
            MM: '%dm ago',
            y: 'a year ago',
            yy: '%dy ago',
          },
        })
      }

      return (
        <div className={classNames.cellComponentContainer}>
          <Tag
            color={getSentimentColorByText(item.sentiment)}
            leftIcon={getSentimentIconByText(item.sentiment)}
          >
            {item.sentiment}
          </Tag>
          <div className="row ac gap-xs">
            <Icon name="Calendar" color={colors.text.secondary} size={18} />
            <p style={{ color: colors.text.secondary }}>{fromNow(item.created_at)}</p>
          </div>
          <div className="row ac gap-xs">
            <Icon name="Link" color={colors.text.secondary} size={18} />
            <p style={{ color: colors.text.secondary }} className={classNames.truncate}>
              {getDomain(item.source_url)}
            </p>
          </div>
        </div>
      )
    },
  },
]
