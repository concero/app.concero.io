import { Tag } from '../../tags/Tag/Tag'
import classNames from './RouteCard.module.pcss'
import { Route } from '../../../api/lifi/types'
import { secondsConverter } from '../../../utils/formatting'

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
        <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>
          {secondsConverter(route.transaction_time_seconds)}
        </h5>
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
        <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>{route.steps.length}</h5>
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
        <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>${route.cost.total_gas_usd}</h5>
      </Tag>
    </div>
  )
}
