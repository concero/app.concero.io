import { type Dispatch } from 'react'
import { fetchTokenBalance } from '../api/rango/fetchTokenBalance'
import { addingTokenDecimals } from './formatting'
import { type SwapAction } from '../components/cards/SwapCard/swapReducer/types'
import { reverseRangoChainsMap } from '../api/rango/rangoChainsMap'

interface HandleBalanceProps {
	dispatch: Dispatch<any>
	from: {
		chain: {
			id: string
			providers: Array<{
				name: string
				symbol: string
			}>
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
	if (!from || !address) {
		handleError(dispatch)
		return
	}

	const rangoChainSymbol = reverseRangoChainsMap[String(from.chain.id)]
	if (!rangoChainSymbol) {
		handleError(dispatch)
		return
	}

	const response = await fetchTokenBalance(rangoChainSymbol, from.token.address, address, from.token.symbol)
	if (response.status !== 200) {
		handleError(dispatch)
		return
	}

	const balanceAmount = addingTokenDecimals(response.data, from.token.decimals)
	const result = `${balanceAmount} ${from.token.symbol}`
	dispatch({ type: 'SET_BALANCE', payload: result })
}
