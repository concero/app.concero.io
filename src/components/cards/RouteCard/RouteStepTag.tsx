import { FC } from 'react'
import classNames from './RouteCard.module.pcss'
import { renderStepsCountTag } from './renderStepsCountTag'
import { renderAllTagInfo } from './renderAllInfoTag'
import { Avatar } from '../../tags/Avatar/Avatar'
import Icon from '../../Icon'
import { RouteEndPoint } from './RouteEndPoint'
import { RouteStepTagProps } from './types'

export const RouteStepTag: FC<RouteStepTagProps> = ({ step, isRoutesCollapsed, length, isSelected }) => {
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

  const amountFrom = parseFloat(step.from.token.amount) / 10 ** 18

  return (
    <div className={`${fullWidthStyle} ${classNames.routeStepContainer}`}>
      <div className={`${classNames.routeStep} ${classNames.tagStyle} ${fullWidthStyle} ${getColor('tag')}`}>
        <div className={classNames.stepInfoContainer}>
          <Avatar src={step.tool.logo_uri} size="md" />
          <Icon name="Transform" size={20} />
          <RouteEndPoint side={step.from} amount={amountFrom.toFixed(4)} />
          <Icon name="ArrowRight" size={20} />
          <RouteEndPoint side={step.to} amount={step.to.token.amount} />
        </div>
        {renderAllTagInfo(isRoutesCollapsed, step, isSelected, getColor)}
      </div>
      {renderStepsCountTag(isRoutesCollapsed, isSelected, length, getColor)}
    </div>
  )
}
