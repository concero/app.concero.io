import { FC } from 'react'
import { CardHeader } from '../CardHeader/CardHeader.tsx'
import { Button } from '../../buttons/Button/Button.tsx'
import classNames from './ChartCard.module.pcss'

export interface ChartCardProps {}

export const ChartCard: FC<ChartCardProps> = () => {
  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title={'Chart'}>
        <Button variant={'subtle'} size={'sm'} rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}>
          BSC / USDT
        </Button>
      </CardHeader>
      {/*<AdvancedRealTimeChart theme={'dark'} symbol={'BINANCE:BTCUSDT'} interval={'1'} width={'100%'} height={'100%'} />*/}
    </div>
  )
}
