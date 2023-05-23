import React, { FC } from 'react'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'
import classNames from './SwapCard.module.pcss'
import Icon from '../../Icon'
import { Avatar } from '../../tags/Avatar/Avatar.tsx'

interface AvatarsProps {
  entities: [
    {
      id: string
      name: string
    }, {
      id: string
      name: string
    },
  ]
}

const Avatars: FC<AvatarsProps> = ({ entities }) => (
  <div className={classNames.avatarContainer}>
    {entities.map((entity, index) => (
      <>
        {(index < 3)
          && (
            <Avatar size="xs" key={entity.id} src={entity.name} />
          )}
      </>
    ))}
    {entities.length > 3 && <p>{`${entities.length}`}</p>}
  </div>
)

interface RouteButtonProps {
  route: {
    gas_price_usd: string
    transaction_time_seconds: string
    entities: [
      {
        id: string
        name: string
      },
    ]
  }
  onClick: () => void
}

export const RouteButton: FC<RouteButtonProps> = ({ route, onClick }) => (
  <div>
    <Button
      variant="subtle"
      rightIcon={{ name: 'ChevronRight', iconProps: { size: 16, color: colors.grey.medium } }}
      size="sm"
      onClick={onClick}
    >
      <Avatars entities={route.entities} />
      <div className={classNames.routeInfoContainer}>
        <Icon name="GasStation" size="0.85rem" color={colors.text.secondary} />
        <p>{`$${route.gas_price_usd}`}</p>
      </div>
      <div className={classNames.routeInfoContainer}>
        <Icon name="ClockHour3" size="0.85rem" color={colors.text.secondary} />
        <p>{`${route.transaction_time_seconds}s`}</p>
      </div>
    </Button>
  </div>
)
