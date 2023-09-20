import { useReducer } from 'react'
import { manageInitialState } from './manageInitialState'
import { StakingState } from '../../../../screens/StakingScreen/stakingReducer/types'

function manageReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_MODAL_TYPE':
      return {
        ...state,
        modalType: action.payload,
      }
    case 'SET_CHAIN': {
      return {
        ...state,
        [action.direction]: { ...state[action.direction], chain: action.payload, token: action.tokens[0] },
      }
    }
    case 'SET_DIRECTION':
      return { ...state, direction: action.payload }
    case 'SET_TOKEN': {
      return {
        ...state,
        [action.direction]: { ...state[action.direction], token: action.payload },
      }
    }
    case 'SET_SWAP_TYPE':
      return { ...state, swapType: action.payload }
    case 'SET_AMOUNT':
      return {
        ...state,
        [action.direction]: { ...state[action.direction], amount: action.payload },
      }
    case 'SET_ADDRESS':
      return { ...state, address: action.payload }
    case 'SET_CHAIN_BY_VAULT':
      const { chain, chainId, symbol, logoURI } = action.payload
      return {
        ...state,
        [action.direction]: { ...state.to, chain: { id: chainId, symbol: symbol, name: chain, logoURI } },
      }
    case 'SET_ROUTE':
      if (action.fromAmount !== state.from.amount) return state
      return { ...state, route: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_RESPONSE':
      return { ...state, response: action.payload }
    default:
      return new Error(`Unhandled action type: ${action.type}`)
  }
}

export function useManageReducer(stakingState: StakingState) {
  const initState = manageInitialState(stakingState)
  const [manageState, manageDispatch] = useReducer(manageReducer, initState)
  return [manageState, manageDispatch]
}
