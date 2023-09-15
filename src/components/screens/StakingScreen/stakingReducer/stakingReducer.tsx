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
    case 'SET_CHAINS':
      return { ...state, chains: action.payload }
    case 'SET_VAULTS':
      return { ...state, vaults: action.payload }
    case 'PUSH_VAULTS':
      return { ...state, vaults: [...state.vaults, ...action.payload] }
    case 'SET_BALANCES':
      return { ...state, userBalances: action.payload }
    case 'SET_ADDRESS':
      return { ...state, address: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const useStakingReducer = () => {
  const [stakingState, dispatch] = useReducer(stakingReducer, initialState)
  return [stakingState, dispatch]
}
