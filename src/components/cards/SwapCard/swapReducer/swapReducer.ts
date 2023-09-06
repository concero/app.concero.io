import { useReducer } from 'react'
import { Action, State } from '../types'
import { swapInitialState } from './swapInitialState'
import { swapActions } from './swapActions'

function swapReducer(state: State, action: Action) {
  const actionHandler = swapActions[action.type]
  if (actionHandler) return actionHandler(state, action)
  throw new Error(`Unknown action type: ${action.type}`)
}

export const useSwapReducer = () => {
  const [state, dispatch] = useReducer(swapReducer, swapInitialState)

  return [state, dispatch]
}
