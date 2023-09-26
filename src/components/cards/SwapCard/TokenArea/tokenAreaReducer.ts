import { useReducer } from 'react'

export const initialState = (direction, selection) => ({
	showChainsModal: false,
	showTokensModal: false,
	currentTokenPriceUSD: 0,
	isFocused: false,
	shake: false,
})

export function tokenAreaReducer(state, action) {
	switch (action.type) {
		case 'SET_SHOW_CHAINS_MODAL':
			return { ...state, showChainsModal: action.payload }
		case 'SET_SHOW_TOKENS_MODAL':
			return { ...state, showTokensModal: action.payload }
		case 'SET_CURRENT_TOKEN_PRICE_USD':
			return { ...state, currentTokenPriceUSD: action.payload }
		case 'SET_IS_FOCUSED':
			return { ...state, isFocused: action.payload }
		case 'SET_SHAKE':
			return { ...state, shake: action.payload }
		default:
			throw new Error(`Unknown action type: ${action.type}`)
	}
}

// Create a custom hook to use this reducer
export const useTokenAreaReducer = (direction, selection) => {
	const [state, dispatch] = useReducer(tokenAreaReducer, initialState(direction, selection))
	return [state, dispatch]
}
