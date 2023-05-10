import { FC } from 'react'
import { CardHeader } from './CardHeader'
import { Button } from '../buttons/Button/Button'

export interface ChartCardProps {}

export const ChartCard: FC<ChartCardProps> = () => {
  return (
    <div className="card f1">
      <CardHeader title={'Chart'}>
        <Button secondary sm>
          BSC / USDT
        </Button>
      </CardHeader>
    </div>
  )
}
