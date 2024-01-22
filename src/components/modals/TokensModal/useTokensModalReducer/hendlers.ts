import type { SET_BALANCE_TOKENS, SET_TOKENS, TokensModalState, UPSERT_TOKENS } from './types'
import type { Token } from '../../../../api/concero/types'

export function setBalanceTokens(state: TokensModalState, action: SET_BALANCE_TOKENS): TokensModalState {
	if (action.balanceTokens === null) return state

	const { selectedChain } = state

	if (selectedChain) {
		const balanceTokens = action.balanceTokens[selectedChain.id]
		const filteredTokens = state.tokens.filter((token: Token) => !balanceTokens?.find((t: Token) => t._id === token._id))
		return {
			...state,
			balanceTokens: action.balanceTokens,
			tokens: [...(balanceTokens ?? []), ...filteredTokens],
		}
	}

	const tokensToPaste: Token[] = []
	for (const balanceToken in action.balanceTokens) {
		tokensToPaste.push(...action.balanceTokens[balanceToken])
	}
	return { ...state, balanceTokens: action.balanceTokens, tokens: tokensToPaste ?? [] }
}

export function setTokens(state: TokensModalState, action: SET_TOKENS): TokensModalState {
	if (!state.selectedChain) {
		return { ...state, tokens: action.tokens }
	}

	if (!state.balanceTokens?.[state.selectedChain.id]?.length) {
		return { ...state, tokens: action.tokens }
	}

	const filteredTokens = action.tokens.filter((token: Token) => {
		const chainId = state.selectedChain?.id
		return !state.balanceTokens?.[chainId!]?.find((t: Token) => t._id === token._id)
	})

	return { ...state, tokens: filteredTokens }
}

export function upsertTokens(state: TokensModalState, action: UPSERT_TOKENS): TokensModalState {
	if (!state.selectedChain || !state.balanceTokens) {
		return { ...state, tokens: [...state.tokens, ...action.tokens] }
	}

	const filteredTokens = action.tokens.filter((token: Token) => {
		const chainId = state.selectedChain?.id
		return !state.balanceTokens?.[chainId!]?.find((t: Token) => t._id === token._id)
	})

	return { ...state, tokens: [...state.tokens, ...filteredTokens] }
}
