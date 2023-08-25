import { useReducer } from 'react'
import { initialState } from './initialState'

const stakingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUTE':
      return { ...state, route: action.payload }
    default:
      return state
  }
}

export const useStakingReducer = () => {
  const [state, dispatch] = useReducer(stakingReducer, initialState)

  return [state, dispatch]
}
