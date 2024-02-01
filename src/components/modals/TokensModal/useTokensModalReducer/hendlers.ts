import type { SET_BALANCE_TOKENS, SET_TOKENS, TokensModalState, UPSERT_TOKENS } from './types'
import type { Token } from '../../../../api/concero/types'

export function setBalanceTokens(state: TokensModalState, action: SET_BALANCE_TOKENS): TokensModalState {
	if (action.balanceTokens === null) return state

	const { selectedChain } = state

	const searchTokens = (tokens: Token[]) => {
		if (state.searchValue) {
			return tokens.filter(
				(token: Token) =>
					token.name.toLowerCase().includes(state.searchValue.toLowerCase()) ||
					token.symbol.toLowerCase().includes(state.searchValue.toLowerCase()) ||
					token.address.toLowerCase().includes(state.searchValue.toLowerCase()),
			)
		}
		return tokens
	}

	if (selectedChain) {
		let balanceTokens = action.balanceTokens[selectedChain.id]
		if (state.searchValue) {
			balanceTokens = searchTokens(balanceTokens ?? [])
		}
		const filteredTokens = state.tokens.filter((token: Token) => !balanceTokens?.find((t: Token) => t._id === token._id))
		return {
			...state,
			balanceTokens: action.balanceTokens,
			tokens: [...(balanceTokens ?? []), ...filteredTokens],
		}
	}

	let tokensToPaste: Token[] = []
	for (const balanceToken in action.balanceTokens) {
		tokensToPaste.push(...action.balanceTokens[balanceToken])
	}

	if (state.searchValue) {
		tokensToPaste = searchTokens(tokensToPaste)
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
		return !state.balanceTokens?.[chainId]?.find((t: Token) => t._id === token._id)
	})

	return { ...state, tokens: filteredTokens }
}

export function upsertTokens(state: TokensModalState, action: UPSERT_TOKENS): TokensModalState {
	if (!state.selectedChain || !state.balanceTokens) {
		return { ...state, tokens: [...state.tokens, ...action.tokens] }
	}

	const filteredTokens = action.tokens.filter((token: Token) => {
		const chainId = state.selectedChain?.id
		return !state.balanceTokens?.[chainId]?.find((t: Token) => t._id === token._id)
	})

	return { ...state, tokens: [...state.tokens, ...filteredTokens] }
}
