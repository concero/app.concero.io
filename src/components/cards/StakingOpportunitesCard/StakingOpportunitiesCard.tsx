import { Dispatch, memo, UIEvent, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import classNames from './StakingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags/FilteredTags'
import { StakingCard } from '../StakingCard/StakingCard'
import { StakingState, Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { getMoreVaults, getVaults } from './getVaults'
import { CardHeader } from '../CardHeader/CardHeader'

interface StakingOpportunitiesProps {
  stakingState: StakingState
  dispatch: Dispatch<any>
}

const MemoizedStakingCard = memo(StakingCard)

export function StakingOpportunitiesCard({ stakingState, dispatch }: StakingOpportunitiesProps) {
  const { selectedVault, vaults } = stakingState
  const { address } = useAccount()
  const [offset, setOffset] = useState(0)
  const limit = 15

  function handleSelect(vault) {
    dispatch({ type: 'SET_SELECTED_VAULT', payload: vault })
  }

  function handleEndReached() {
    const newOffset = offset + limit
    setOffset(newOffset)
    getMoreVaults(dispatch, address, stakingState, newOffset, limit)
  }

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight) handleEndReached()
  }

  useEffect(() => {
    setOffset(0)
    getVaults(dispatch, address, stakingState, 0, limit)
  }, [stakingState.filter])

  return (
    <div className={`card ${classNames.container}`}>
      <CardHeader title="Staking opportunities" isLoading={stakingState.loading} />
      <FilteredTags dispatch={dispatch} stakingState={stakingState} />
      <div className={classNames.stakingCardsContainer} onScroll={handleScroll}>
        {vaults?.map((vault: Vault) => (
          <MemoizedStakingCard key={vault._id} isSelected={selectedVault?._id === vault._id} vault={vault} onClick={handleSelect} />
        ))}
      </div>
    </div>
  )
}
