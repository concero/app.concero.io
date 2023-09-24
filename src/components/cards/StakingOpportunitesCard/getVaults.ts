import { Dispatch } from 'react'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { fetchPools } from '../../../api/concero/fetchPools'

export function populatePoolsBalances(pools, stakingState) {
  const { balances } = stakingState
  return pools.map((pool) => {
    const stakedAmount = balances[pool.chainId]?.find((b) => b.address === pool.address)?.balance
    if (stakedAmount) pool.stakedAmount = stakedAmount
    return pool
  })
}

export async function getVaults(dispatch: Dispatch<any>, address, stakingState: StakingState, offset: number, limit: number) {
  dispatch({ type: 'SET_LOADING', payload: true })
  try {
    const pools = await fetchPools(stakingState, address, offset, limit)
    const poolsWithBalances = populatePoolsBalances(pools, stakingState)
    dispatch({ type: 'SET_VAULTS', payload: poolsWithBalances })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: pools[0] })
  } catch (error) {
    console.error(error)
    dispatch({ type: 'SET_VAULTS', payload: [] })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: null })
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false })
  }
}

export async function getMoreVaults(dispatch: Dispatch<any>, address, stakingState: StakingState, offset: number, limit: number) {
  dispatch({ type: 'SET_LOADING', payload: true })
  try {
    const pools = await fetchPools(stakingState, address, offset, limit)
    dispatch({ type: 'PUSH_VAULTS', payload: pools })
  } catch (error) {
    console.error(error)
    dispatch({ type: 'PUSH_VAULTS', payload: [] })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: null })
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false })
  }
}
