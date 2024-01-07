import { useReducer } from 'react'
import { FilterDispatchType } from '../contants'
import { type FilterAction, type FilterState } from './types'

const initialState: FilterState = {
	isChainsModalOpened: false,
	isCategoriesModalOpened: false,
	isApyModalOpened: false,
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
	switch (action.type) {
		case FilterDispatchType.setIsChainsModalOpened:
			return { ...state, isChainsModalOpened: action.payload }
		case FilterDispatchType.setIsApyModalOpened:
			return { ...state, isApyModalOpened: action.payload }
		case FilterDispatchType.setIsCategoryModalOpened:
			return { ...state, isCategoriesModalOpened: action.payload }
		default:
			throw new Error("Don't understand action")
	}
}

export function useFilteredTagsReducer() {
	const [filterState, filterDispatch] = useReducer(filterReducer, initialState)
	return [filterState, filterDispatch] as const
}
