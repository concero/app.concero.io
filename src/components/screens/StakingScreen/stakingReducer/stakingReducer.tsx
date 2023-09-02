import { useReducer } from 'react'
import { initialState } from './initialState'

const stakingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROUTE':
      return { ...state, route: action.payload }
    case 'SET_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.filter]: action.payload.value,
        },
      }
    case 'SET_SELECTED_VAULT':
      return { ...state, selectedVault: action.payload }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const useStakingReducer = () => {
  const [state, dispatch] = useReducer(stakingReducer, initialState)

  return [state, dispatch]
}
