import { FC } from 'react'
import { ArrowRight, Transform } from 'tabler-icons-react'
import classNames from './RouteCard.module.pcss'
import { renderStepsCountTag } from './renderStepsCountTag'
import { Avatar } from '../../tags/Avatar/Avatar'
import { RouteEndPoint } from './RouteEndPoint'
import { RouteStepTagProps } from './types'
import { renderAdditionalInfo } from './renderAdditionalInfo'

export const RouteStepTag: FC<RouteStepTagProps> = ({ step, isRoutesCollapsed, setIsRoutesCollapsed, length, isSelected }) => {
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

  const amountFrom = (parseFloat(step.from.token.amount) / 10 ** 18).toFixed(2)

  return (
    <div className={`${fullWidthStyle} ${classNames.routeStepContainer}`}>
      <div className={`${classNames.routeStep} ${classNames.tagStyle} ${fullWidthStyle} ${getColor('tag')}`}>
        <div className={classNames.stepInfoContainer}>
          <Avatar src={step.tool.logo_uri} size="md" />
          <Transform size={20} />
          <RouteEndPoint side={step.from} amount={amountFrom} />
          <ArrowRight size={20} />
          <RouteEndPoint side={step.to} amount={step.to.token.amount} />
        </div>
        {renderAdditionalInfo(isRoutesCollapsed, step, isSelected, getColor)}
      </div>
      {renderStepsCountTag(isRoutesCollapsed, setIsRoutesCollapsed, isSelected, length, getColor)}
    </div>
  )
}
