import { Dispatch } from 'react'
import { fetchPools } from '../../../api/concero/fetchPools'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'

export async function populateVaults(dispatch: Dispatch<any>, stakingState: StakingState) {
  try {
    const pools = await fetchPools(stakingState)
    dispatch({ type: 'SET_VAULTS', payload: pools })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: pools[0] })
  } catch (error) {
    console.error(error)
    dispatch({ type: 'SET_VAULTS', payload: [] })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: null })
  }
}
