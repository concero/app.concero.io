import { FC } from 'react'
import classNames from './InfoCard.module.pcss'
import { Tag } from '../../../tags/Tag/Tag'

interface InfoCardProps {
  item: {
    title: string
    value: string
    last_24h: string
    secondaryValue?: string
  }
}

export const InfoCard: FC<InfoCardProps> = ({ item }) => {
  const { title, value, last_24h, secondaryValue } = item

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.titleContainer}>
        <h5>{title}</h5>
      </div>
      <div className={classNames.infoContainer}>
        <h3>{value}</h3>
        {secondaryValue ? (
          <h4>{secondaryValue}</h4>
        ) : (
          <Tag color="main" size="sm">
            <h5 className={classNames.tagText}>{last_24h}</h5>
          </Tag>
        )}
      </div>
    </div>
  )
}
