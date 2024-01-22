import { type Dispatch, useReducer } from 'react'
import {
	type SET_BALANCE_TOKENS,
	type SET_TOKENS,
	TokenModalActionType,
	type TokensModalAction,
	type TokensModalState,
} from './types'
import { type Token } from '../../../../api/concero/types'

const initialState: TokensModalState = {
	selectedChain: null,
	offset: 0,
	tokens: [],
	balanceTokens: [],
	isLoading: false,
	isBalanceLoading: false,
}

function setBalanceTokens(state: TokensModalState, action: SET_BALANCE_TOKENS): TokensModalState {
	if (action.balanceTokens === null) return state

	const { selectedChain } = state

	if (selectedChain) {
		const balanceTokens = action.balanceTokens[selectedChain.id]
		const filteredTokens = state.tokens.filter((token: Token) => !balanceTokens?.find((t: Token) => t._id === token._id))
		return { ...state, balanceTokens: action.balanceTokens[selectedChain.id] ?? [], tokens: filteredTokens }
	}

	const tokensToPaste: Token[] = []
	for (const balanceToken in action.balanceTokens) {
		tokensToPaste.push(...action.balanceTokens[balanceToken])
	}
	return { ...state, balanceTokens: tokensToPaste, tokens: tokensToPaste }
}

function setTokens(state: TokensModalState, action: SET_TOKENS): TokensModalState {
	if (!state.balanceTokens?.length) return { ...state, tokens: action.tokens }

	const filteredTokens = action.tokens.filter(token => {
		return !state.balanceTokens.find((t: Token) => t._id === token._id)
	})

	return { ...state, tokens: filteredTokens }
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
		default:
			throw new Error(`Unhandled action type useTokensModalReducer`)
	}
}

export function useTokensModalReducer(): [TokensModalState, Dispatch<TokensModalAction>] {
	const [tokensModalState, tokensModalDispatch] = useReducer(tokensModalReducer, initialState)

	return [tokensModalState, tokensModalDispatch]
}
