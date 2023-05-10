import { FC } from 'react'
import { CardHeader } from './CardHeader'

interface SwapCardProps {}

export const SwapCard: FC<SwapCardProps> = () => {
  return (
    <div className="card">
      <CardHeader title={'Swap'}></CardHeader>
    </div>
  )
}
