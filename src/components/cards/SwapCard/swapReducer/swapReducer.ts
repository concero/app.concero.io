import { type Dispatch, useReducer } from 'react'
import { swapActions } from './swapActions'
import { swapInitialState } from './swapInitialState'
import { type SwapAction, type SwapState } from './types'

function swapReducer(state: SwapState, action: SwapAction): SwapState {
	const actionHandler = swapActions[action.type]
	if (actionHandler) return actionHandler(state, action)
	throw new Error(`Unknown action type: ${action.type}`)
}

export const useSwapReducer = (selection: any): [SwapState, Dispatch<SwapAction>] => {
	const [state, dispatch] = useReducer(swapReducer, swapInitialState(selection))
	return [state, dispatch]
}
