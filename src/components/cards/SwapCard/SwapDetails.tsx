import { FC } from 'react'
import classNames from './SwapCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import Icon from '../../Icon'
import { colors } from '../../../constants/colors'
import { CryptoIcon } from '../../tags/CryptoSymbol/CryptoIcon'
import { Avatar } from '../../tags/Avatar/Avatar'

interface SwapDetailsProps {
  selection: {
    from: Selection,
    to: Selection
  }
}

interface Selection {
  chain: Chain,
  token: Token
}

interface Token {
  name: string
  symbol: string
}

interface Chain {
  name: string
  symbol: string
}

const rate = {
  from: '0.15',
  to: '1',
}

const route = {
  gas_price_usd: '12',
  transaction_time_seconds: 120,
  entities: [
    {
      id: '1',
      name: 'BNB',
    }, {
      id: '2',
      name: 'USDT',
    }, {
      id: '3',
      name: 'USDT',
    }, {
      id: '4',
      name: 'USDT',
    },
  ],
}

interface RateTagProps {
  from: Token
  to: Token
  rate: {
    from: string
    to: string
  }
}

const RateTag: FC<RateTagProps> = ({ from, to, rate }) => (
  <div className={classNames.swapTagContainer}>
    <div className={classNames.swapPriceTag}>
      <p>{rate.from}</p>
      <CryptoIcon symbol={from.name} />
    </div>
    <p className={classNames.equalSign}>=</p>
    <div className={classNames.swapPriceTag}>
      <p>{rate.to}</p>
      <CryptoIcon symbol={to.name} />
    </div>
  </div>
)

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
}

const RouteButton: FC<RouteButtonProps> = ({ route }) => (
  <div>
    <Button
      variant="subtle"
      rightIcon={{ name: 'ChevronRight', iconProps: { size: 16, color: colors.grey.medium } }}
      size="sm"
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

export const SwapDetails: FC<SwapDetailsProps> = ({ selection }) => (
  <div className={classNames.swapDetailsContainer}>
    <RateTag from={selection.from.token} to={selection.to.token} rate={rate} />
    <RouteButton route={route} />
  </div>
)
