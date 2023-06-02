import {FC} from 'react'
import {Avatar} from '../../tags/Avatar/Avatar'
import Icon from '../../Icon'
import classNames from './RouteCard.module.pcss'
import {renderStepsCountTag} from './renderStepsCountTag'
import {renderAllTagInfo} from './renderAllInfoTag'
import {RouteEndPoint} from './RouteEndPoint'

interface RouteStepTagProps {
  step: Step,
  isRoutesCollapsed: true | false
  length?: number | undefined
  isSelected: true | false
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
  amount: {
    usd: string,
    token: string,
  }
}

export const RouteStepTag: FC<RouteStepTagProps> = ({
                                                      step,
                                                      isRoutesCollapsed,
                                                      length,
                                                      isSelected,
                                                    }) => {
  const fullWidthStyle = !isRoutesCollapsed ? classNames.fullWidth : ''

  const getColor = (type: string): undefined | string => {
    if (!isSelected) return

    switch (type) {
      case 'tag':
        return classNames.bestTag
      case 'text':
        return classNames.bestText
    }
  }

  return (
    <div className={`${fullWidthStyle} ${classNames.routeStepContainer}`}>
      <div
        className={`${classNames.routeStep} ${classNames.tagStyle} ${fullWidthStyle} ${getColor('tag')}`}>
        <div className={classNames.stepInfoContainer}>
          <Avatar src={`src/assets/cryptoSymbols/${step.exchange.name}.svg`} size="md"/>
          <Icon name="Transform" size={20}/>
          <RouteEndPoint side={step.from} amount={step.amount.usd}/>
          <Icon name="ArrowRight" size={20}/>
          <RouteEndPoint side={step.to} amount={step.amount.token}/>
        </div>
        <div>
          {renderAllTagInfo(
            isRoutesCollapsed,
            step,
            isSelected,
            getColor,
          )}
        </div>
      </div>
      {renderStepsCountTag(
        isRoutesCollapsed,
        isSelected,
        length,
        getColor,
      )}
    </div>
  )
}
