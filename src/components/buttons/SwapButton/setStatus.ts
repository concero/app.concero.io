import { Dispatch, From, To } from './types'
import { Route } from '../../../api/lifi/types'

const handleTransactionResponse = (
  transactionResponse: { isOk: boolean; message: string },
  routes: Route[],
  dispatch: Dispatch,
) => {
  if (!transactionResponse.isOk) {
    switch (transactionResponse.message) {
      case 'user rejected':
        dispatch({ type: 'CANCELED' })
        break
      case 'unknown error':
        dispatch({ type: 'WRONG' })
        break
      case 'No routes found':
        if (!routes.length) {
          dispatch({ type: 'NO_ROUTES' })
        }
        break
      case 'Insufficient balance':
        dispatch({ type: 'LOW_BALANCE' })
        break
      default:
        dispatch({ type: 'SET_RESPONSE', payload: transactionResponse })
        break
    }
  } else {
    dispatch({ type: 'SUCCESS' })
  }
}

export const setStatus = (
  from: From,
  to: To,
  isConnected: boolean,
  isLoading: boolean,
  dispatch: Dispatch,
  routes: Route[],
  balance: string,
  transactionResponse: {
    isOk: boolean
    message: string
  },
) => {
  if (isLoading) {
    return dispatch({ type: 'LOADING' })
  }

  if (!isConnected) {
    return dispatch({ type: 'DISCONNECTED' })
  }

  if (transactionResponse) {
    return handleTransactionResponse(transactionResponse, routes, dispatch)
  }

  if (!from.amount || (from.amount && !routes.length)) {
    return dispatch({ type: 'NO_AMOUNT' })
  }

  if (balance && from.amount > parseFloat(balance)) {
    return dispatch({ type: 'LOW_BALANCE' })
  }

  if (from.amount && to.amount && routes.length) {
    return dispatch({ type: 'SWAP' })
  }
}