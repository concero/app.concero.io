import { type Dispatch, useReducer } from 'react'
import { initialState } from './initialState'
import { type EarnAction, type EarnState } from './types'

const earnScreenReducer = (state: EarnState, action: EarnAction): EarnState => {
	switch (action.type) {
		case 'SET_FILTER':
			return { ...state, filter: { ...state.filter, [action.payload.filter]: action.payload.value } }
		case 'SET_SELECTED_VAULT':
			return { ...state, selectedVault: action.payload }
		case 'SET_VAULTS':
			return { ...state, vaults: action.payload }
		case 'PUSH_VAULTS':
			return { ...state, vaults: [...state.vaults, ...action.payload] }
		case 'SET_LOADING':
			return { ...state, loading: action.payload }
		case 'SET_BALANCES':
			return { ...state, balances: action.payload }
		case 'SET_ADDRESS':
			return { ...state, address: action.payload }
		default:
			throw new Error(`Unhandled action type`)
	}
}

export function useEarnReducer(): [EarnState, Dispatch<EarnAction>] {
	const [earnState, earnDispatch] = useReducer(earnScreenReducer, initialState)
	return [earnState, earnDispatch]
}
