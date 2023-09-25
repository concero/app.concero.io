import { Dispatch } from 'react'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { fetchPools } from '../../../api/concero/fetchPools'

export function populatePoolsBalances(pools, stakingState) {
  const { balances } = stakingState
  return pools.map((pool) => {
    const stakedAmount = balances[pool.chainId]?.find((b) => b.address === pool.widoAddress)?.balance
    if (stakedAmount) {
      console.log('found stakedAmount', stakedAmount)
      pool.stakedAmount = stakedAmount
    }
    return pool
  })
}

export async function getVaults(stakingDispatch: Dispatch<any>, address, stakingState: StakingState, offset: number, limit: number) {
  stakingDispatch({ type: 'SET_LOADING', payload: true })
  try {
    const pools = await fetchPools(stakingState, address, offset, limit)
    const poolsWithBalances = populatePoolsBalances(pools, stakingState)
    stakingDispatch({ type: 'SET_VAULTS', payload: poolsWithBalances })
    stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: pools[0] })
  } catch (error) {
    console.error(error)
    stakingDispatch({ type: 'SET_VAULTS', payload: [] })
    stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
  } finally {
    stakingDispatch({ type: 'SET_LOADING', payload: false })
  }
}

export async function getMoreVaults(stakingDispatch: Dispatch<any>, address, stakingState: StakingState, offset: number, limit: number) {
  stakingDispatch({ type: 'SET_LOADING', payload: true })
  try {
    const pools = await fetchPools(stakingState, address, offset, limit)
    stakingDispatch({ type: 'PUSH_VAULTS', payload: pools })
  } catch (error) {
    console.error(error)
    stakingDispatch({ type: 'PUSH_VAULTS', payload: [] })
    stakingDispatch({ type: 'SET_SELECTED_VAULT', payload: null })
  } finally {
    stakingDispatch({ type: 'SET_LOADING', payload: false })
  }
}
