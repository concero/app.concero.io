import { RatioChart } from '../../layout/RatioChart/RatioChart'
import { colors } from '../../../constants/colors'
import classNames from './RatioCard.module.pcss'

const data = {
  total: 100,
  items: [
    {
      name: 'USDT',
      value: 20,
      color: colors.green.dark,
    },
    {
      name: 'ETH',
      value: 80,
      color: colors.primary.mainLight,
    },
  ],
}

export function RatioCard() {
  return (
    <div className={classNames.container}>
      <h5 className="cardHeaderTitle">Ratio</h5>
      <div className={classNames.chartContainer}>
        <RatioChart data={data} />
      </div>
    </div>
  )
}
