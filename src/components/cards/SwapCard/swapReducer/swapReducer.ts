import { type Dispatch, useContext, useEffect, useReducer } from 'react'
import { swapActions } from './swapActions'
import { swapInitialState } from './swapInitialState'
import { type SwapAction, type SwapState } from './types'
import { SelectionContext } from '../../../../hooks/SelectionContext'
import { DataContext } from '../../../../hooks/DataContext/DataContext'

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
			state.from.chain.id === '1' &&
			state.to.chain.id === '137' &&
			state.to.token.priceUsd === null &&
			tokens['1'] &&
			tokens['137']
		) {
			dispatch({ type: 'SET_TOKEN', payload: { token: tokens['1'][0] }, direction: 'from' })
			dispatch({ type: 'SET_TOKEN', payload: { token: tokens['137'][0] }, direction: 'to' })
		}
	}, [tokens])

	return [state, dispatch]
}
