import { Dispatch, UIEvent, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import classNames from './StakingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags/FilteredTags'
import { StakingCard } from '../StakingCard/StakingCard'
import { StakingState, Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { pushVaults, setVaults } from './getVaults'

interface StakingOpportunitiesProps {
  stakingState: StakingState
  dispatch: Dispatch<any>
}

export function StakingOpportunitiesCard({ stakingState, dispatch }: StakingOpportunitiesProps) {
  const { selectedVault, vaults } = stakingState
  const { address } = useAccount()
  const [offset, setOffset] = useState(0)
  const limit = 15

  const handleSelect = (vault) => dispatch({ type: 'SET_SELECTED_VAULT', payload: vault })

  const handleEndReached = () => {
    const newOffset = offset + limit
    setOffset(newOffset)
    try {
      pushVaults(dispatch, address, stakingState, newOffset, limit)
    } catch (error) {
      console.error(error)
    }
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      handleEndReached()
    }
  }

  useEffect(() => {
    setOffset(0)
    setVaults(dispatch, address, stakingState, 0, limit)
  }, [stakingState.filter])

  return (
    <div className={`card ${classNames.container}`}>
      <h5 className="cardHeaderTitle">Staking opportunities</h5>
      <FilteredTags dispatch={dispatch} stakingState={stakingState} />
      <div className={classNames.stakingCardsContainer} onScroll={handleScroll}>
        {vaults?.map((vault: Vault) => (
          <StakingCard key={vault._id} isSelected={selectedVault?._id === vault._id} vault={vault} onClick={handleSelect} />
        ))}
      </div>
    </div>
  )
}
