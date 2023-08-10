import { Tag } from '../../tags/Tag/Tag'
import classNames from './RouteCard.module.pcss'
import { Route } from '../../../api/lifi/types'
import { capitalize, secondsConverter } from '../../../utils/formatting'

export const renderTags = (
  route: Route,
  isSelected: boolean,
  getTextColor: () => string,
  getIconColor: () => string,
) => {
  const advantageTagText = route?.tags[0]?.toLowerCase() === 'recommended' ? 'best' : route?.tags[0]?.toLowerCase()

  return (
    <div className={classNames.infoTagsContainer}>
      {route?.tags[0]?.length > 0 ? (
        <Tag color={route.tags[0].toLowerCase()}>
          <p className={`body1 ${classNames.advantageTagColor}`}>{capitalize(advantageTagText)}</p>
        </Tag>
      ) : null}
      <Tag
        color={'transparent'}
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
      {route.slippage_percent ? (
        <Tag
          color={'transparent'}
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
      ) : null}
      {route.cost.total_gas_usd ? (
        <Tag
          color={'transparent'}
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
      ) : null}
    </div>
  )
}
