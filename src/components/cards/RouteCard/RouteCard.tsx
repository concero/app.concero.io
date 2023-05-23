import { FC, useState } from 'react'
import { Card } from '../Card/Card'
import classNames from './RouteCard.module.pcss'
import { Tag } from '../../tags/Tag/Tag'
import { colors } from '../../../constants/colors'
import { capitalize } from '../../../utils/formatting'
import { RouteStepTag } from './RouteStepTag'
import { Button } from '../../buttons/Button/Button'

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
  onClick?: () => void
}

interface RouteStep {
  id: string,
  transaction_time_seconds: string,
  gas_price_usd: string,
  slippage_percent: string,
}

const getTagBgColor = (advantage: string) => {
  switch (advantage) {
    case 'best':
      return colors.primary.main
    case 'fast':
      return colors.primary.dark
    case 'shortest':
      return colors.primary.darker
  }
}
export const RouteCard: FC<RouteCardProps> = ({ route, onClick }) => {
  const [isRoutesHidden, setIsRoutesHidden] = useState<true | false>(true)

  return (
    <Card classNames={classNames.container}>
      <div className={classNames.cardHeader}>
        <div className={classNames.cardHeaderLeftSide}>
          <h3>Net value:</h3>
          <h3>{`$${route.amount_usd}`}</h3>
          <h3 className={classNames.subtitle}>{`${route.amount_token}`}</h3>
          <Tag bgColor={getTagBgColor(route.advantage)}>{capitalize(route.advantage)}</Tag>
        </div>
        <Button
          variant="black"
          rightIcon={{ name: `${isRoutesHidden ? 'ChevronDown' : 'ChevronUp'}`, iconProps: { size: '20px' } }}
          size="sm"
          onClick={() => setIsRoutesHidden(!isRoutesHidden)}
        />
      </div>
      <div style={{ flexDirection: 'row' }} className={classNames.stepsContainer}>
        {route.route_steps.map((step) => (
          <RouteStepTag key={step.id} step={step} isRoutesHidden={isRoutesHidden} />
        ))}
      </div>
    </Card>
  )
}
