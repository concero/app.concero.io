import { Dispatch, FC, useEffect } from 'react'
import classNames from './StakingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags/FilteredTags'
import { StakingCard } from '../StakingCard/StakingCard'
import { Filter, Protocol, Vault } from '../../screens/StakingScreen/stakingReducer/types'
import { fetchPools } from '../../../api/concero/fetchPools'

interface StakingOpportunitiesProps {
  stakingState: {
    selectedVault: Vault
    vaults: Vault[]
    protocols: Protocol
    filter: Filter
  }
  dispatch: Dispatch<any>
}

export const StakingOpportunitiesCard: FC<StakingOpportunitiesProps> = ({ stakingState, dispatch }) => {
  const { selectedVault, vaults, protocols } = stakingState

  const handleSelect = (vault) => dispatch({ type: 'SET_SELECTED_VAULT', payload: vault })

  async function populateVaults() {
    try {
      const pools = await fetchPools()
      dispatch({ type: 'SET_VAULTS', payload: pools })
      dispatch({ type: 'SET_SELECTED_VAULT', payload: pools[0] })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    populateVaults()
  }, [])

  return (
    <div className={`card ${classNames.container}`}>
      <h5 className="cardHeaderTitle">Staking opportunities</h5>
      <FilteredTags dispatch={dispatch} stakingState={stakingState} />
      <div className={classNames.stakingCardsContainer}>
        {vaults?.map((vault: Vault) => (
          <StakingCard key={vault._id} isSelected={selectedVault?._id === vault._id} vault={vault} onClick={handleSelect} protocols={protocols} />
        ))}
      </div>
    </div>
  )
}
