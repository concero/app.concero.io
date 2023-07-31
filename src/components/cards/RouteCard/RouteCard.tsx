import { FC, useState } from 'react'
import { Card } from '../Card/Card'
import classNames from './RouteCard.module.pcss'
import { colors } from '../../../constants/colors'
import { Button } from '../../buttons/Button/Button'
import { renderTags } from './renderTags'
import { renderSteps } from './renderSteps'
import { RouteCardProps } from './types'

export const RouteCard: FC<RouteCardProps> = ({ route, isSelected, onClick }) => {
  const [isRoutesCollapsed, setIsRoutesCollapsed] = useState<true | false>(true)

  const getTextColor = () => (isSelected ? classNames.bestText : '')
  const getIconColor = () => (isSelected ? colors.primary.light : colors.text.secondary)

  return (
    <Card
      className={`${classNames.container} ${isSelected ? classNames.selectedCard : ''}`}
      onClick={() => onClick(route.id)}
    >
      <div className={classNames.cardHeader}>
        <div className={classNames.cardHeaderLeftSide}>
          <h4>Net value:</h4>
          <h3>{`$${route.to.token.amount_usd}`}</h3>
          <h3 className={classNames.subtitle}>{`${route.to.token.amount} ${route.to.token.symbol}`}</h3>
        </div>
        <Button
          variant="black"
          rightIcon={{
            name: `${isRoutesCollapsed ? 'ChevronDown' : 'ChevronUp'}`,
            iconProps: { size: '20px' },
          }}
          size="sm"
          onClick={() => setIsRoutesCollapsed(!isRoutesCollapsed)}
          className={isSelected ? classNames.bestButton : ''}
        />
      </div>
      <div className={classNames.stepsContainer}>
        {renderSteps(route, isRoutesCollapsed, setIsRoutesCollapsed, isSelected)}
      </div>
      {renderTags(route, isSelected, getTextColor, getIconColor)}
    </Card>
  )
}
