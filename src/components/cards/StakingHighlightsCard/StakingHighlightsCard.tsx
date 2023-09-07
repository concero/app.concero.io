import classNames from './StakingHighlightsCard.module.pcss'
import { Highlight } from '../../tags/Highlight/Highlight'

const items = [
  {
    id: '1',
    title: 'TVL',
    value: '$432.3M',
    last_24h: '2.55',
  },
  {
    id: '2',
    title: 'APY',
    value: '124%',
    last_24h: '0.55',
  },
  {
    id: '3',
    title: 'TVL',
    value: '$432.3M',
    last_24h: '5.54',
  },
]

export const StakingHighlightsCard = () => {
  return (
    <div className={`card ${classNames.container}`}>
      <h5 className={'cardHeaderTitle'}>Highlights</h5>
      <div className={classNames.higlitsContainer}>
        {items.map((item) => {
          return <Highlight key={item.id} size={'sm'} item={item} />
        })}
      </div>
    </div>
  )
}
