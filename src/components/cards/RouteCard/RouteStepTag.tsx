import { FC } from 'react'
import { Avatar } from '../../tags/Avatar/Avatar'
import Icon from '../../Icon'
import classNames from './RouteCard.module.pcss'
import { colors } from '../../../constants/colors'

interface RouteStepTagProps {
  step: Step,
  isRoutesHidden: true | false
}

interface Step {
  id: string,
  transaction_time_seconds: string,
  gas_price_usd: string,
  slippage_percent: string,
  from: {
    token: {
      name: string,
      symbol: string,
    },
    chain: {
      name: string,
      symbol: string,
    }
  },
  to: {
    token: {
      name: string,
      symbol: string,
    },
    chain: {
      name: string,
      symbol: string,
    }
  }
  exchange: {
    name: string,
    symbol: string,
  },

}

function RouteEndPoint({ side }: Step) {
  return (
    <div className={classNames.endPointContainer}>
      <div className={classNames.avatarContainer}>
        <Avatar src={`src/assets/cryptoSymbols/${side.token.name}.svg`} size="md" />
        <Avatar src={`src/assets/cryptoSymbols/${side.chain.name}.svg`} size="xs" className={classNames.chainAvatar} />
      </div>
      <h5>3.32</h5>
    </div>
  )
}

function AdditionalInfoTag({ title, type }: { title: string, type: string }) {
  return (
    <div className={classNames.additionalInfoTag}>
      <Icon name={type === 'time' ? 'Clock' : 'GasStation'} size="1rem" color={colors.grey.medium} />
      <h5
        className={classNames.textSubtitle}
      >
        {`${(type === 'gas') ? '$' : ''}${title}${(type === 'time') ? 's' : ''}`}
      </h5>
    </div>
  )
}

export const RouteStepTag: FC<RouteStepTagProps> = ({ step, isRoutesHidden }) => {
  const style = !isRoutesHidden ? classNames.fullWidth : ''

  return (
    <div className={`${classNames.routeStepContainer} ${style}`}>
      <div className={classNames.stepInfoContainer}>
        <Avatar src={`src/assets/cryptoSymbols/${step.exchange.name}.svg`} size="md" />
        <Icon name="Transform" size={20} />
        <RouteEndPoint side={step.from} />
        <Icon name="ArrowRight" size={20} />
        <RouteEndPoint side={step.to} />
      </div>
      <div>
        {!isRoutesHidden ? (
          <div style={{ flexDirection: 'row', gap: 10 }}>
            <AdditionalInfoTag title={step.gas_price_usd} type="time" />
            <AdditionalInfoTag title={step.transaction_time_seconds} type="gas" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
