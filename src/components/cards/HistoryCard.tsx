import { FC } from 'react'
import { CardHeader } from './CardHeader'

interface HistoryCardProps {}

export const HistoryCard: FC<HistoryCardProps> = () => {
  return (
    <div className="card f1">
      <CardHeader title={'History'}></CardHeader>
    </div>
  )
}
