import { IconClock, IconPigMoney } from '@tabler/icons-react'
import classNames from './RouteCard.module.pcss'
import { colors } from '../../../constants/colors'
import { Step } from '../../../api/lifi/types'
import { secondsConverter } from '../../../utils/formatting'

function AdditionalInfoTag({ title, type, getColor, isBestRoute }: { title: string; type: string; getColor: () => string; isBestRoute: boolean }) {
  const RenderedIcon = type === 'time' ? IconClock : IconPigMoney

  return (
    <div className={classNames.additionalInfoTag}>
      <RenderedIcon size="1rem" color={isBestRoute ? colors.primary.light : colors.grey.medium} />
      <h5 className={`${classNames.textSubtitle} ${getColor('text')}`}>{`${type === 'gas' ? '$' : ''}${type === 'gas' ? title : secondsConverter(title)}`}</h5>
    </div>
  )
}

export const renderAdditionalInfo = (isRoutesCollapsed: boolean, step: Step, isBestRoute: boolean, getColor: () => string | undefined) => (
  <div>
    {!isRoutesCollapsed ? (
      <div
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <AdditionalInfoTag title={step.tool.estimated_execution_time_seconds} type="time" getColor={getColor} isBestRoute={isBestRoute} />
        {step.tool.gas_usd ? <AdditionalInfoTag title={step.tool.gas_usd} type="gas" getColor={getColor} isBestRoute={isBestRoute} /> : null}
      </div>
    ) : null}
  </div>
)
