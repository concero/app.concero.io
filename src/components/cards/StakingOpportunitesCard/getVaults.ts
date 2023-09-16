import { Dispatch } from 'react'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { fetchPools } from '../../../api/concero/fetchPools'

export async function setVaults(dispatch: Dispatch<any>, stakingState: StakingState, offset: number, limit: number) {
  try {
    const pools = await fetchPools(stakingState, offset, limit)
    dispatch({ type: 'SET_VAULTS', payload: pools })
  } catch (error) {
    console.error(error)
    dispatch({ type: 'SET_VAULTS', payload: [] })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: null })
  }
}

export async function pushVaults(dispatch: Dispatch<any>, stakingState: StakingState, offset: number, limit: number) {
  try {
    const pools = await fetchPools(stakingState, offset, limit)
    dispatch({ type: 'PUSH_VAULTS', payload: pools })
  } catch (error) {
    console.error(error)
    dispatch({ type: 'PUSH_VAULTS', payload: [] })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: null })
  }
}
