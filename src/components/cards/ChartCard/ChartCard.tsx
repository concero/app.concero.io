import {FC, useState} from 'react'
import {AdvancedRealTimeChart} from 'react-ts-tradingview-widgets'
import {CardHeader} from '../CardHeader/CardHeader'
import {Button} from '../../buttons/Button/Button'
import classNames from './ChartCard.module.pcss'
import {Chart} from './Chart'
import {Beacon} from '../../layout/Beacon'

export interface ChartCardProps {
}

export const ChartCard: FC<ChartCardProps> = () => {
  const [chartType, setChartType] = useState<'chart' | 'tradingView'>('chart')
  const toggleChartType = (): void => {
    setChartType(chartType === 'chart' ? 'tradingView' : 'chart')
  }

  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title="Chart">
        <Button
          variant="subtle"
          size="sm"
          rightIcon={{
            name: 'ChevronDown',
            iconProps: {size: 18}
          }}
        >
          BSC / USDT
        </Button>
        <Button variant="subtle" size="sm" onClick={() => toggleChartType()}>
          <Beacon isOn={chartType === 'tradingView'}/>
          TradingView
        </Button>
      </CardHeader>
      <div className="f1">
        {chartType === 'chart' ? (
          <Chart/>
        ) : (
          <AdvancedRealTimeChart
            theme="dark"
            symbol="BINANCE:BTCUSDT"
            interval="1"
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  )
}
