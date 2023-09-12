import { Dispatch } from 'react'
import { fetchPools } from '../../../api/concero/fetchPools'

export async function populateVaults(dispatch: Dispatch<any>) {
  try {
    const pools = await fetchPools()
    dispatch({ type: 'SET_VAULTS', payload: pools })
    dispatch({ type: 'SET_SELECTED_VAULT', payload: pools[0] })
  } catch (error) {
    console.error(error)
  }
}
