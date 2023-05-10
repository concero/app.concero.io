import { FC } from 'react'
import { CardHeader } from './CardHeader'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
  return (
    <div className="card">
      <CardHeader title={'News'}></CardHeader>
    </div>
  )
}
