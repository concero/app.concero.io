import { Dispatch } from 'react'

export const populateChains = async (getChains, dispatch: Dispatch<any>) => {
  const chains = await getChains()
  dispatch({ type: 'SET_CHAINS', payload: chains })
}
