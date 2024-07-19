import { type Dispatch, useContext, useEffect, useReducer } from 'react'
import { swapActions } from './swapActions'
import { swapInitialState } from './swapInitialState'
import { type SwapAction, type SwapState } from './types'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { SelectionContext } from '../../../../hooks/SelectionContext'

function swapReducer(state: SwapState, action: SwapAction): SwapState {
	const actionHandler = swapActions[action.type]
	if (actionHandler) return actionHandler(state, action)
	throw new Error(`Unknown action type: ${action.type}`)
}

export const useSwapReducer = (): [SwapState, Dispatch<SwapAction>] => {
	const { selection } = useContext(SelectionContext)
	const { tokens } = useContext(DataContext)
	const [state, dispatch] = useReducer(swapReducer, swapInitialState(selection))

	// a crutch that is needed because we initialize swapReducer using selectionContext which has hardcoded tokens
	useEffect(() => {
		if (
			state.from.token.priceUsd === null &&
			state.from.chain.id === '8453' &&
			state.to.chain.id === '8453' &&
			state.to.token.priceUsd === null &&
			tokens['8453']
		) {
			dispatch({ type: 'SET_TOKEN', payload: { token: tokens['8453'][0] }, direction: 'from' })
			dispatch({ type: 'SET_TOKEN', payload: { token: tokens['8453'][1] }, direction: 'to' })
		}
	}, [tokens])

	return useReducer(swapReducer, swapInitialState())
}
