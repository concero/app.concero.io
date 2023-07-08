import { Tag } from '../../tags/Tag/Tag'
import classNames from './RouteCard.module.pcss'
import { Route } from './RouteCard'

export const renderTags = (
  route: Route,
  isSelected: boolean,
  getTextColor: () => string,
  getIconColor: () => string,
) => {
  const getBgColor = isSelected ? 'mainDarker' : 'grey'

  return (
    <div className={classNames.infoTagsContainer}>
      <Tag
        color={getBgColor}
        leftIcon={{
          name: 'Clock',
          iconProps: {
            size: 20,
            color: getIconColor(),
          },
        }}
      >
        <p className={`${classNames.bodyColor} body2 ${getTextColor()}`}>
          {route.transaction_time_seconds}
        </p>
      </Tag>
      <Tag
        color={getBgColor}
        leftIcon={{
          name: 'ArrowWaveRightUp',
          iconProps: {
            size: 20,
            color: getIconColor(),
          },
        }}
      >
        <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>{route.slippage_percent}%</h5>
      </Tag>
      <Tag
        color={getBgColor}
        leftIcon={{
          name: 'Refresh',
          iconProps: {
            size: 20,
            color: getIconColor(),
          },
        }}
      >
        <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>{route.route_steps.length}</h5>
      </Tag>
      <Tag
        color={getBgColor}
        leftIcon={{
          name: 'GasStation',
          iconProps: {
            size: 20,
            color: getIconColor(),
          },
        }}
      >
        <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>${route.gas_price_usd}</h5>
      </Tag>
    </div>
  )
}
