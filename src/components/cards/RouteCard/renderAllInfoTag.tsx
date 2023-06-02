import classNames from './RouteCard.module.pcss'
import Icon from '../../Icon'
import { colors } from '../../../constants/colors'

function AdditionalInfoTag({
  title,
  type,
  getColor,
  isBestRoute,
}: {
  title: string
  type: string
  getColor: () => string
  isBestRoute: boolean
}) {
  return (
    <div className={classNames.additionalInfoTag}>
      <Icon
        name={type === 'time' ? 'Clock' : 'GasStation'}
        size="1rem"
        color={isBestRoute ? colors.primary.light : colors.grey.medium}
      />
      <h5 className={`${classNames.textSubtitle} ${getColor('text')}`}>
        {`${type === 'gas' ? '$' : ''}${title}${type === 'time' ? 's' : ''}`}
      </h5>
    </div>
  )
}

export const renderAllTagInfo = (
  isRoutesCollapsed: boolean,
  step: Step,
  isBestRoute: boolean,
  getColor: () => string | undefined,
) => (
  <>
    {!isRoutesCollapsed ? (
      <div style={{ flexDirection: 'row', gap: 10 }}>
        <AdditionalInfoTag
          title={step.gas_price_usd}
          type="time"
          getColor={getColor}
          isBestRoute={isBestRoute}
        />
        <AdditionalInfoTag
          title={step.transaction_time_seconds}
          type="gas"
          getColor={getColor}
          isBestRoute={isBestRoute}
        />
      </div>
    ) : null}
  </>
)
