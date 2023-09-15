import classNames from './HighlightCard.module.pcss'
import { Highlight } from '../../tags/Highlight/Highlight'

interface HighlightCardProps {
  title: string
  value: string
  last_24h: string
}

export const HighlightCard = ({ item }) => {
  return (
    <div className={`card ${classNames.container}`}>
      <Highlight size={'md'} item={item} />
    </div>
  )
}
