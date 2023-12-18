import { Dispatch, MutableRefObject } from 'react'
import { ManageAction, ManageState } from './useEarnReducer/types'
import { clearRoute } from './clearRoute'
import { Status, SwapType } from './constants'
import { addingAmountDecimals, addingTokenDecimals, roundNumberByDecimals } from '../../../../utils/formatting'
import { fetchTokenPrice } from '../../../../api/enso/fetchTokenPrice'
import BigNumber from 'bignumber.js'
import { fetchEnsoQuote } from '../../../../api/enso/fetchEnsoQuote'
import { retryRequest } from '../../../../utils/retryRequest'

interface IGetQuote {
	manageState: ManageState
	manageDispatch: Dispatch<ManageAction>
	typingTimeoutRef: MutableRefObject<any>
}

function handleError(error: Error, manageDispatch: Dispatch<ManageAction>): void {
	if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
	} else {
		manageDispatch({ type: 'SET_STATUS', payload: Status.noRoute })
	}
}

async function getEnsoQuote(state: ManageState, dispatch: Dispatch<ManageAction>): Promise<void> {
	const route = await retryRequest(
		async () =>
			await fetchEnsoQuote({
				chainId: state.from.chain.id,
				fromAddress: state.address,
				amountIn: addingAmountDecimals(state.from.amount, state.from.token.decimals) as string,
				tokenIn: state.from.token.address,
				tokenOut: state.to.token.address,
			}),
		{ retryCount: 3 },
	)

	const response = await fetchTokenPrice(state.from.chain.id, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
	if (!route) return dispatch({ type: 'SET_STATUS', payload: Status.noRoute })
	let gasUsd: null | string = null

	if (route.gas) {
		const humanReadableGas = addingTokenDecimals(route.gas._hex, response.decimals) as string
		gasUsd = roundNumberByDecimals(new BigNumber(humanReadableGas).times(response.price).toString(), 4)
	}

	let toAmountUsd: null | string = null

	if (state.swapType === SwapType.withdraw) {
		const toTokenPrice = await fetchTokenPrice(state.from.chain.id, state.to.token.address)
		const humanReadableAmount = addingTokenDecimals(route.amountOut, toTokenPrice.decimals) as string
		toAmountUsd = roundNumberByDecimals(new BigNumber(humanReadableAmount).times(toTokenPrice.price).toString(), 4)
	}
	dispatch({ type: 'SET_ROUTE', payload: route, fromAmount: state.from.amount, gasUsd, toAmountUsd })
}

async function handleFetchQuote(state: ManageState, dispatch: Dispatch<ManageAction>): Promise<void> {
	dispatch({ type: 'SET_LOADING', payload: true })
	dispatch({ type: 'SET_STATUS', payload: Status.loading })
	try {
		await getEnsoQuote(state, dispatch)
	} catch (error) {
		console.error(error)
		handleError(error as Error, dispatch)
	} finally {
		dispatch({ type: 'SET_LOADING', payload: false })
	}
}

export async function getQuote({ manageState, manageDispatch, typingTimeoutRef }: IGetQuote): Promise<void> {
	if (!manageState.from.amount) return clearRoute(manageDispatch, typingTimeoutRef)
	try {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		typingTimeoutRef.current = setTimeout(() => handleFetchQuote(manageState, manageDispatch), 700)
	} catch (error) {
		console.error('[getQuote] ', error)
	}
}
