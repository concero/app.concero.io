import { FC, useState } from 'react'
import { Card } from '../Card/Card'
import classNames from './RouteCard.module.pcss'
import { Tag } from '../../tags/Tag/Tag'
import { colors } from '../../../constants/colors'
import { capitalize } from '../../../utils/formatting'
import { Button } from '../../buttons/Button/Button'
import { renderTags } from './rendersTags'
import { renderSteps } from './renderSteps'

interface RouteCardProps {
  route: {
    id: string,
    amount_usd: string,
    amount_token: string,
    advantage: string,
    transaction_time_seconds: string,
    gas_price_usd: string,
    slippage_percent: string,
    route_steps: RouteStep[]
  },
}

interface RouteStep {
  id: string,
  transaction_time_seconds: string,
  gas_price_usd: string,
  slippage_percent: string,
}

const getAdvantageTagBgColor = (advantage: string) => {
  switch (advantage) {
    case 'best':
      return colors.primary.main
    case 'fast':
      return colors.primary.dark
    case 'shortest':
      return colors.primary.darker
  }
}
export const RouteCard: FC<RouteCardProps> = ({ route }) => {
  const [isRoutesCollapsed, setIsRoutesCollapsed] = useState<true | false>(true)
  const isBestRoute = route.advantage === 'best'
  const getTextColor = () => (isBestRoute ? classNames.bestText : '')
  const getIconColor = () => (isBestRoute ? colors.primary.light : colors.text.secondary)

  return (
    <Card classNames={`${classNames.container} ${isBestRoute ? classNames.bestCard : ''}`}>
      <div className={classNames.cardHeader}>
        <div className={classNames.cardHeaderLeftSide}>
          <h3>Net value:</h3>
          <h3>{`$${route.net_value_usd}`}</h3>
          <h3 className={classNames.subtitle}>{`${route.net_value_token}`}</h3>
          <Tag bgColor={getAdvantageTagBgColor(route.advantage)}>{capitalize(route.advantage)}</Tag>
        </div>
        <Button
          variant="black"
          rightIcon={{ name: `${isRoutesCollapsed ? 'ChevronDown' : 'ChevronUp'}`, iconProps: { size: '20px' } }}
          size="sm"
          onClick={() => setIsRoutesCollapsed(!isRoutesCollapsed)}
          className={isBestRoute ? classNames.bestButton : ''}
        />
      </div>
      <div className={classNames.stepsContainer}>
        {renderSteps(
          route,
          isRoutesCollapsed,
          isBestRoute,
        )}
      </div>
      {renderTags(
        route,
        isBestRoute,
        getTextColor,
        getIconColor,
      )}
    </Card>
  )
}
