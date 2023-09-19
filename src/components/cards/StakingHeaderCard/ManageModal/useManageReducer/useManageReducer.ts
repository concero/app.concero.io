import { useReducer } from 'react'
import { manageInitialState } from './manageInitialState'

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
    case 'SET_AMOUNT': {
      return {
        ...state,
        [action.direction]: { ...state[action.direction], amount: action.payload },
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
    default:
      return new Error(`Unhandled action type: ${action.type}`)
  }
}

export function useManageReducer() {
  const [manageState, manageDispatch] = useReducer(manageReducer, manageInitialState)
  return [manageState, manageDispatch]
}
