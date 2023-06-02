import { Tag } from '../../tags/Tag/Tag'
import { colors } from '../../../constants/colors'
import classNames from './RouteCard.module.pcss'

export const renderTags = (
  route: Route,
  isBestRoute: boolean,
  getTextColor: () => string,
  getIconColor: () => string,
) => (
  <div className={classNames.infoTagsContainer}>
    <Tag
      bgColor={isBestRoute ? colors.primary.darker : colors.grey.darker}
      leftIcon={{ name: 'Clock', iconProps: { size: 20, color: getIconColor() } }}
    >
      <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>
        {route.transaction_time_seconds}s
      </h5>
    </Tag>
    <Tag
      bgColor={isBestRoute ? colors.primary.darker : colors.grey.darker}
      leftIcon={{ name: 'ArrowWaveRightUp', iconProps: { size: 20, color: getIconColor() } }}
    >
      <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>{route.slippage_percent}%</h5>
    </Tag>
    <Tag
      bgColor={isBestRoute ? colors.primary.darker : colors.grey.darker}
      leftIcon={{ name: 'Refresh', iconProps: { size: 20, color: getIconColor() } }}
    >
      <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>{route.route_steps.length}</h5>
    </Tag>
    <Tag
      bgColor={isBestRoute ? colors.primary.darker : colors.grey.darker}
      leftIcon={{ name: 'GasStation', iconProps: { size: 20, color: getIconColor() } }}
    >
      <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>${route.gas_price_usd}</h5>
    </Tag>
  </div>
)
