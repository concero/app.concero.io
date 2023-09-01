import { useReducer } from 'react'
import { Action, State } from '../types'
import { initialState } from './initialState'
import { actionHandlers } from './actionHandlers'

function swapReducer(state: State, action: Action) {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) return actionHandler(state, action)
  throw new Error(`Unknown action type: ${action.type}`)
}

export const useSwapReducer = () => {
  const [state, dispatch] = useReducer(swapReducer, initialState)

  return [state, dispatch]
}
