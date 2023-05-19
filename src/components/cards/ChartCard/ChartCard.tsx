import React, { FC } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './ChartCard.module.pcss'
import { Chart } from './Chart'

export interface ChartCardProps {}

export const ChartCard: FC<ChartCardProps> = () => (
  <div className={`card ${classNames.container}`}>
    <CardHeader title="Chart">
      <Button
        variant="subtle"
        size="sm"
        rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}
      >
        BSC / USDT
      </Button>
    </CardHeader>
    <div className="f1">
      <Chart />
    </div>
    {/* <AdvancedRealTimeChart theme={'dark'} symbol={'BINANCE:BTCUSDT'} interval={'1'} width={'100%'} height={'100%'} /> */}
  </div>
)
