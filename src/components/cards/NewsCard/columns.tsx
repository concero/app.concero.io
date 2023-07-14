import React from 'react'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import { colors } from '../../../constants/colors'
import Icon from '../../Icon'
import { fromNow, truncate } from '../../../utils/formatting'
import classNames from './NewsCard.module.pcss'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

export const columns = [
  {
    columnTitle: 'Title',
    cellComponent: (item) => <p style={{ color: colors.grey.light }}>{truncate(item.title, 90)}</p>,
  },
  {
    columnTitle: 'Sentiment',
    cellComponent: (item) => {
      const isDesktop = useMediaQuery('mobile')

      dayjs.extend(updateLocale)
      dayjs.updateLocale('en', {
        relativeTime: {
          future: 'in %s',
          past: '%s',
          s: 'now',
          m: 'a min',
          mm: '%dm',
          h: '1h',
          hh: '%dh',
          d: 'a day',
          dd: '%dd',
          M: 'a month',
          MM: '%dm',
          y: 'a year',
          yy: '%dy',
        },
      })

      return (
        <div className={classNames.cellComponentContainer}>
          {/* <Tag */}
          {/*  color={getSentimentColorByText(item.sentiment)} */}
          {/*  leftIcon={getSentimentIconByText(item.sentiment)} */}
          {/* > */}
          {/*  {item.sentiment} */}
          {/* </Tag> */}
          <div className="row ac gap-xs">
            <Icon name="Clock" color={colors.text.secondary} size={18} />
            <p style={{ color: colors.text.secondary }}>{fromNow(item.created_at)}</p>
          </div>
          <div className="row ac gap-xs">
            <Icon name="Link" color={colors.text.secondary} size={18} />
            <a href={item.url} target="_blank" rel="noreferrer">
              <p style={{ color: colors.text.secondary }} className={classNames.truncate}>
                {item.source.title}
              </p>
            </a>
          </div>
        </div>
      )
    },
  },
]
