import { useReducer } from 'react'
import { manageInitialState } from './manageInitialState'

function manageReducer(state: any, action: any) {
  switch (action.type) {
    default:
      return new Error(`Unhandled action type: ${action.type}`)
  }
}

export function useManageReducer() {
  const [manageState, manageDispatch] = useReducer(manageReducer, manageInitialState)
  return [manageState, manageDispatch]
}
