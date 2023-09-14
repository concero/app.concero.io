import { Dispatch } from 'react'
import { getBalances } from 'wido'
import { StakingState } from './stakingReducer/types'

export const populateBalances = async (address: string, stakingState: StakingState, dispatch: Dispatch<any>) => {
  const balances = await getBalances(
    address,
    stakingState.chains.map((chain) => chain.id),
  )
  dispatch({ type: 'SET_BALANCES', payload: balances })
}

export const populateChains = async (getChains, dispatch: Dispatch<any>) => {
  const chains = await getChains()
  dispatch({ type: 'SET_CHAINS', payload: chains })
}
