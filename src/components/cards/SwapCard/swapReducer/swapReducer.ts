import { useReducer } from 'react'
import { Action, State } from '../types'
import { swapActions } from './swapActions'
import { swapInitialState } from './swapInitialState'

function swapReducer(state: State, action: Action) {
  const actionHandler = swapActions[action.type]
  if (actionHandler) return actionHandler(state, action)
  throw new Error(`Unknown action type: ${action.type}`)
}

export const useSwapReducer = (selection: any) => {
  const [state, dispatch] = useReducer(swapReducer, swapInitialState(selection))
  return [state, dispatch]
}
