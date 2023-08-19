import classNames from './StackingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags'

export const StackingOpportunitiesCard = () => {
  return (
    <div className={`card ${classNames.container}`}>
      <h5 className={'cardHeaderTitle'}>Staking opportunities</h5>
      <FilteredTags />
    </div>
  )
}
