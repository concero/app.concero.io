import { useContext } from 'react'
import { Tag } from '../../tags/Tag/Tag'
import classNames from './RouteCard.module.pcss'
import { Route } from '../../../api/lifi/types'
import { capitalize, numberToFormatString, secondsConverter } from '../../../utils/formatting'
import { Beacon } from '../../layout/Beacon/Beacon'
import { InsuranceContext } from '../SwapCard/InsuranceContext'

export const renderTags = (
  route: Route,
  isSelected: boolean,
  getTextColor: () => string,
  getIconColor: () => string,
) => {
  const advantageTagText = route?.tags[0]?.toLowerCase() === 'recommended' ? 'best' : route?.tags[0]?.toLowerCase()
  const { toggleInsurance } = useContext(InsuranceContext)

  const handleInsuranceButtonClick = (event) => {
    event.stopPropagation()
    toggleInsurance(route.id)
  }

  return (
    <div className={classNames.infoTagsContainer}>
      {route?.tags[0]?.length > 0 ? (
        <Tag color={route.tags[0].toLowerCase()}>
          <p style={{ color: 'inherit' }}>{capitalize(advantageTagText)}</p>
        </Tag>
      ) : null}
      {route.insurance ? (
        <Tag color="green" onClick={(e) => handleInsuranceButtonClick(e)}>
          Insurance
          <Beacon isOn={route.insurance?.state === 'INSURED'} color={'green'} />
        </Tag>
      ) : // <Button variant="green" size="sm" onClick={(e) => handleInsuranceButtonClick(e)}>
      //
      // </Button>
      null}
      <Tag
        color="transparent"
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
          color="transparent"
          leftIcon={{
            name: 'ArrowWaveRightUp',
            iconProps: {
              size: 20,
              color: getIconColor(),
            },
          }}
        >
          <h5 className={`${classNames.bodyColor} ${getTextColor()}`}>
            {numberToFormatString(route.slippage_percent)}%
          </h5>
        </Tag>
      ) : null}
      {route.cost.total_gas_usd ? (
        <Tag
          color="transparent"
          leftIcon={{
            name: 'PigMoney',
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
