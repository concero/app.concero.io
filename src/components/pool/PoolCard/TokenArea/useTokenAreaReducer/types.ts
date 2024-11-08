export interface TokenAreaState {
	showTokensModal: boolean
	currentTokenPriceUSD: number
	isFocused: boolean
	shake: boolean
}

export type TokenAreaAction =
	| { type: 'SET_SHOW_TOKENS_MODAL'; payload: boolean }
	| { type: 'SET_CURRENT_TOKEN_PRICE_USD'; payload: number }
	| { type: 'SET_IS_FOCUSED'; payload: boolean }
	| { type: 'SET_SHAKE'; payload: boolean }
