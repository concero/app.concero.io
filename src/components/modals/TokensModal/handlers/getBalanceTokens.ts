import { fetchTokensByBalances } from '../../../../api/concero/fetchTokensByBalances'
import { type Dispatch } from 'react'
import { TokenModalActionType, type TokensModalAction } from '../useTokensModalReducer/types'
import { type Chain } from '../../../../types/StandardRoute'

export async function getBalanceTokens(
	tokensModalDispatch: Dispatch<TokensModalAction>,
	address: string | undefined,
	selectedChain: Chain | null,
) {
	if (!address) return

	try {
		tokensModalDispatch({ type: TokenModalActionType.SET_IS_BALANCE_LOADING, isBalanceLoading: true })
		const res = await fetchTokensByBalances(selectedChain?.id, address)
		tokensModalDispatch({ type: TokenModalActionType.SET_BALANCE_TOKENS, balanceTokens: res })
	} catch (error) {
		console.error(error)
	} finally {
		tokensModalDispatch({ type: TokenModalActionType.SET_IS_BALANCE_LOADING, isBalanceLoading: false })
		tokensModalDispatch({ type: TokenModalActionType.SET_IS_LOADING, isLoading: false })
	}
}
