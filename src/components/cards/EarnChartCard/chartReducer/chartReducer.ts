import { useReducer } from 'react'
import { initialState } from './initialState'
import { reducer } from './reducer'

export const useChartReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return [state, dispatch]
}
