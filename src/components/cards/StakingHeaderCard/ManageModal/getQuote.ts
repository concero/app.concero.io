import { Dispatch, MutableRefObject } from 'react'
import { ManageAction, ManageState } from './useManageReducer/types'
import { clearRoute } from './clearRoute'
import { Status } from './constants'
import { get } from '../../../../api/client'
import { config } from '../../../../constants/config'
import { addingDecimals } from '../../../../utils/formatting'

interface IGetQuote {
	manageState: ManageState
	manageDispatch: Dispatch<ManageAction>
	typingTimeoutRef: MutableRefObject<any>
}

function handleError(error: Error, manageDispatch: Dispatch<ManageAction>) {
	if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
	} else if (error.message.includes('FAILED_DEPENDENCY')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.noRoute })
	} else {
		manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
	}
}

export interface FetchEnsoQuoteParams {
	chainId: number;
	fromAddress: string;
	toEoa?: boolean;
	amountIn: string;
	tokenIn: string;
	tokenOut: string;
}

async function fetchEnsoQuote({ chainId, fromAddress, toEoa = false, amountIn, tokenIn, tokenOut} : FetchEnsoQuoteParams) {
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${config.ENSO_API_KEY}`
	}
  const url = `https://api.enso.finance/api/v1/shortcuts/route?chainId=${chainId}&fromAddress=${fromAddress}&toEoa=${toEoa}&amountIn=${amountIn}&tokenIn=${tokenIn}&tokenOut=${tokenOut}`;

	console.log('chainId', chainId)
	console.log('fromAddress', fromAddress)
	console.log('toEoa', toEoa)
	console.log('amountIn', amountIn)
	console.log('tokenIn', tokenIn)
	console.log('tokenOut', tokenOut)

  try {
    const response = await get(url, { headers });
		console.log('response', response.data)
		return response.data;
  } catch (error) {
    console.error('Error fetching Enso route:', error);
  }
};

async function fetchQuote(state: ManageState, dispatch: Dispatch<ManageAction>) {
	dispatch({ type: 'SET_LOADING', payload: true })
	dispatch({ type: 'SET_STATUS', payload: Status.loading })
	try {
		const route = await fetchEnsoQuote({
			chainId: state.from.chain.id,
			fromAddress: state.address,
			amountIn: addingDecimals(state.from.amount, state.from.token.decimals),
			tokenIn: state.from.token.address,
			tokenOut: state.to.token.address
		});
		// const route = await retryRequest(
		// 	async iterator => {
		// 		if (iterator > 0) manageDispatch({ type: 'SET_STATUS', payload: Status.thisMakeTakeAWhile })
		// 		return await fetchWidoQuote(manageState)
		// 	},
		// 	{ throwCondition: (e: any) => !e.message.includes('FAILED_DEPENDENCY'), retryCount: 3 },
		// )
		if (!route) return dispatch({ type: 'SET_STATUS', payload: Status.noRoute })
		dispatch({ type: 'SET_ROUTE', payload: route, fromAmount: state.from.amount })
	} catch (error) {
		console.log(error)
		handleError(error, dispatch)
	} finally {
		dispatch({ type: 'SET_LOADING', payload: false })
	}
}

export async function getQuote({ manageState, manageDispatch, typingTimeoutRef }: IGetQuote) {
	if (!manageState.from.amount) return clearRoute(manageDispatch, typingTimeoutRef)
	try {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
		const typingTimeoutId = setTimeout(() => fetchQuote(manageState, manageDispatch), 700)
		typingTimeoutRef.current = typingTimeoutId
	} catch (error) {
		console.error('[getQuote] ', error)
	}
}
