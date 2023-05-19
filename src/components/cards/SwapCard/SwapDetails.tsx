import { FC } from 'react'
import classNames from './SwapCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import Icon from '../../Icon'
import { colors } from '../../../constants/colors'

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
  from: {
    name: 'BNB',
    symbol: 'BNB',
    price: '0.15',
  },
  to: {
    name: 'ETH',
    symbol: 'ETH',
    price: '1',
  },
}

const route = {
  gas: {
    price: '12',
    symbol: 'USD',
    time: '2m',
  },
}

interface RateTagProps {
  from: Token
  to: Token
  rate: {
    from: {
      name: string
      symbol: string
      price: string
    }
    to: {
      name: string
      symbol: string
      price: string

    }
  }
}

const RateTag: FC<RateTagProps> = ({ from, to, rate }) => (
  <div className={classNames.swapTagContainer}>
    <div className={classNames.swapPriceTag}>
      <p>{rate.from.price}</p>
      <CryptoSymbol name={from.name} />
    </div>
    <p className={classNames.equalSign}>=</p>
    <div className={classNames.swapPriceTag}>
      <p>{rate.to.price}</p>
      <CryptoSymbol name={to.name} />
    </div>
  </div>
)

interface RouteButtonProps {
  route: {
    gas: {
      price: string
      symbol: string
      time: string
    }
  }
}

const RouteButton: FC<RouteButtonProps> = ({ route }) => (
  <div>
    <Button variant="subtle" rightIcon={{ name: 'ChevronRight', iconProps: { size: 18 } }}>
      <div className={classNames.routeInfoContainer}>
        <Icon name="GasStation" size="1.2rem" color={colors.text.secondary} />
        <p>{`$${route.gas.price}`}</p>
      </div>
      <div className={classNames.routeInfoContainer}>
        <Icon name="ClockHour3" size="1.2rem" color={colors.text.secondary} />
        <p>{`${route.gas.time}`}</p>
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
