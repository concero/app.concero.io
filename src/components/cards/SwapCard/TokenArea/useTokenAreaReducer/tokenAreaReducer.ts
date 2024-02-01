import { type Dispatch, useReducer } from 'react'
import { type TokenAreaAction, type TokenAreaState } from './types'

export const initialState = () => ({
	showTokensModal: false,
	currentTokenPriceUSD: 0,
	isFocused: false,
	shake: false,
})

export function tokenAreaReducer(state: TokenAreaState, action: TokenAreaAction) {
	switch (action.type) {
		case 'SET_SHOW_TOKENS_MODAL':
			return { ...state, showTokensModal: action.payload }
		case 'SET_CURRENT_TOKEN_PRICE_USD':
			return { ...state, currentTokenPriceUSD: action.payload }
		case 'SET_IS_FOCUSED':
			return { ...state, isFocused: action.payload }
		case 'SET_SHAKE':
			return { ...state, shake: action.payload }
		default:
			throw new Error(`Unknown action type`)
	}
}

export const useTokenAreaReducer = (): [TokenAreaState, Dispatch<TokenAreaAction>] => {
	const [state, dispatch] = useReducer(tokenAreaReducer, initialState())
	return [state, dispatch]
}
