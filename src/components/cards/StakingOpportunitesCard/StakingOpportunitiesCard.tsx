import { useState } from 'react'
import classNames from './StakingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags'
import { StakingCard } from '../StakingCard/StakingCard'
import { routes } from './routes'

export const StakingOpportunitiesCard = () => {
  const [selectedRoute, setSelectedRoute] = useState(routes[0])

  const handleSelect = (id: string) => {
    const route = routes.find((route) => route.id === id)
    if (route) setSelectedRoute(route)
  }

  return (
    <div className={`card ${classNames.container}`}>
      <h5 className={'cardHeaderTitle'}>Staking opportunities</h5>
      <FilteredTags />
      <div className={classNames.stakingCardsContainer}>
        {routes.map((route) => {
          return (
            <StakingCard
              key={route.id}
              isSelected={selectedRoute.id === route.id}
              route={route}
              onClick={handleSelect}
            />
          )
        })}
      </div>
    </div>
  )
}
