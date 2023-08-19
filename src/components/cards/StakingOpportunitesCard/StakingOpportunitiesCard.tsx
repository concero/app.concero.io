import classNames from './StakingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags'

export const StakingOpportunitiesCard = () => {
  return (
    <div className={`card ${classNames.container}`}>
      <h5 className={'cardHeaderTitle'}>Staking opportunities</h5>
      <FilteredTags />
      {/* {items.map((item) => { */}
      {/*   return <StakingCard /> */}
      {/* })} */}
    </div>
  )
}
