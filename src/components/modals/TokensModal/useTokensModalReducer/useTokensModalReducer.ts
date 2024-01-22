import { type Dispatch, useReducer } from 'react'
import { TokenModalActionType, type TokensModalAction, type TokensModalState } from './types'
import { setBalanceTokens, setTokens, upsertTokens } from './hendlers'

const initialState: TokensModalState = {
	selectedChain: null,
	offset: 0,
	tokens: [],
	balanceTokens: null,
	isLoading: false,
	isBalanceLoading: false,
}

function tokensModalReducer(state: TokensModalState, action: TokensModalAction): TokensModalState {
	switch (action.type) {
		case TokenModalActionType.SET_SELECTED_CHAIN:
			return { ...state, selectedChain: action.chain }
		case TokenModalActionType.SET_OFFSET:
			return { ...state, offset: action.offset }
		case TokenModalActionType.SET_TOKENS:
			return setTokens(state, action)
		case TokenModalActionType.SET_BALANCE_TOKENS:
			return setBalanceTokens(state, action)
		case TokenModalActionType.SET_IS_LOADING:
			return { ...state, isLoading: action.isLoading }
		case TokenModalActionType.SET_IS_BALANCE_LOADING:
			return { ...state, isBalanceLoading: action.isBalanceLoading }
		case TokenModalActionType.UPSERT_TOKENS:
			return upsertTokens(state, action)
		default:
			throw new Error(`Unhandled action type useTokensModalReducer`)
	}
}

export function useTokensModalReducer(): [TokensModalState, Dispatch<TokensModalAction>] {
	const [tokensModalState, tokensModalDispatch] = useReducer(tokensModalReducer, initialState)
	return [tokensModalState, tokensModalDispatch]
}
