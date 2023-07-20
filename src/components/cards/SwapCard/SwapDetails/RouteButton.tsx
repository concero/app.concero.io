import { FC } from 'react'
import { Button } from '../../../buttons/Button/Button'
import { colors } from '../../../../constants/colors'
import classNames from '../SwapCard.module.pcss'
import Icon from '../../../Icon'
import { Avatar } from '../../../tags/Avatar/Avatar'
import { AvatarsProps, RouteButtonProps } from '../types'

const Avatars: FC<AvatarsProps> = ({ entities }) => (
  <div className={classNames.avatarContainer}>
    {entities?.map((entity, index) => (
      <div key={entity.id}>{index < 3 && <Avatar size="xs" src={entity?.tool.logo_uri} />}</div>
    ))}
    {entities?.length > 3 && <p>{`${entities?.length}`}</p>}
  </div>
)

export const RouteButton: FC<RouteButtonProps> = ({ route, onClick }) => (
  <div>
    <Button
      variant="subtle"
      rightIcon={{
        name: 'ChevronRight',
        iconProps: {
          size: 16,
          color: colors.grey.medium,
        },
      }}
      size="sm"
      onClick={onClick}
    >
      <Avatars entities={route?.steps} />
      <div className={classNames.routeInfoContainer}>
        <Icon name="GasStation" size="0.85rem" color={colors.text.secondary} />
        <p>{`$${route?.cost.total_gas_usd ? route.cost.total_gas_usd : ''}`}</p>
      </div>
      <div className={classNames.routeInfoContainer}>
        <Icon name="ClockHour3" size="0.85rem" color={colors.text.secondary} />
        <p>{`${route?.transaction_time_seconds ? route.transaction_time_seconds : ''}s`}</p>
      </div>
    </Button>
  </div>
)
