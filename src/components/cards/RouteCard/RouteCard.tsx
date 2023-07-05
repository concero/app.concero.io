import { FC, useState } from 'react'
import { Card } from '../Card/Card'
import classNames from './RouteCard.module.pcss'
import { Tag } from '../../tags/Tag/Tag'
import { colors } from '../../../constants/colors'
import { capitalize } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { renderTags } from './renderTags'
import { renderSteps } from './renderSteps'

interface RouteCardProps {
  route: {
    id: string
    amount_usd: string
    amount_token: string
    advantage: string
    transaction_time_seconds: string
    gas_price_usd: string
    slippage_percent: string
    route_steps: RouteStep[]
  }
  isSelected: boolean
  onClick: (id: string) => void
}

interface RouteStep {
  id: string
  transaction_time_seconds: string
  gas_price_usd: string
  slippage_percent: string
}

const getAdvantageTagBgColor = (advantage: string): string => {
  switch (advantage) {
    case 'best':
      return 'main'
    case 'fast':
      return 'mainDarker'
    case 'shortest':
      return 'dark'
    default:
      return ''
  }
}
export const RouteCard: FC<RouteCardProps> = ({ route, isSelected, onClick }) => {
  const [isRoutesCollapsed, setIsRoutesCollapsed] = useState<true | false>(true)

  const getTextColor = () => (isSelected ? classNames.bestText : '')
  const getIconColor = () => (isSelected ? colors.primary.light : colors.text.secondary)

  return (
    <Card
      classNames={`${classNames.container} ${isSelected ? classNames.bestCard : ''}`}
      onClick={() => onClick(route.id)}
    >
      <div className={classNames.cardHeader}>
        <div className={classNames.cardHeaderLeftSide}>
          <h3>Net value:</h3>
          <h3>{`$${route.net_value_usd}`}</h3>
          <h3 className={classNames.subtitle}>{`${route.net_value_token}`}</h3>
          <Tag color={getAdvantageTagBgColor(route.advantage)}>{capitalize(route.advantage)}</Tag>
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
        {renderSteps(route, isRoutesCollapsed, isSelected)}
      </div>
      {renderTags(route, isSelected, getTextColor, getIconColor)}
    </Card>
  )
}
