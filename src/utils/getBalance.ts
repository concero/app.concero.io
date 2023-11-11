import { Dispatch } from 'react'
import { fetchTokenBalance } from '../api/rango/fetchTokenBalance'
import { addingTokenDecimals } from './formatting'
import { SwapAction } from '../components/cards/SwapCard/swapReducer/types'
import { reverseRangoChainsMap } from '../api/rango/rangoChainsMap'

interface HandleBalanceProps {
	dispatch: Dispatch<any>
	from: {
		chain: {
			id: string
			providers: {
				name: string
				symbol: string
			}[]
		}
		token: {
			address: string
			symbol: string
			decimals: number
		}
	}
	address: string | null
}

const handleError = (dispatch: Dispatch<SwapAction>) => {
	dispatch({ type: 'SET_BALANCE', payload: null })
}

export async function getBalance({ dispatch, from, address }: HandleBalanceProps) {
	if (!from || !address) return handleError(dispatch)

	const rangoChainSymbol = reverseRangoChainsMap[String(from.chain.id)]
	if (!rangoChainSymbol) return handleError(dispatch)

	const response = await fetchTokenBalance(rangoChainSymbol, from.token.address, address, from.token.symbol)
	if (response.status !== 200) return handleError(dispatch)

	const balanceAmount = addingTokenDecimals(response.data, from.token.decimals)
	const result = `${balanceAmount} ${from.token.symbol}`
	dispatch({ type: 'SET_BALANCE', payload: result })
}
