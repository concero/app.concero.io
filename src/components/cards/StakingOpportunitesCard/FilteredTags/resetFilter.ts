import { Dispatch } from 'react'

export const resetFilter = (dispatch: Dispatch<any>) => {
  dispatch({ type: 'SET_FILTER', payload: { filter: 'all', value: true } })
  dispatch({ type: 'SET_FILTER', payload: { filter: 'my_holdings', value: false } })
  dispatch({ type: 'SET_FILTER', payload: { filter: 'chains', value: [] } })
  dispatch({ type: 'SET_FILTER', payload: { filter: 'apy', value: '' } })
  dispatch({ type: 'SET_FILTER', payload: { filter: 'category', value: [] } })
}
