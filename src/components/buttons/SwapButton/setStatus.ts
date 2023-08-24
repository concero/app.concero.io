import { Dispatch, From, To } from './types'
import { Route } from '../../../api/lifi/types'

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
    dispatch({ type: 'LOADING' })
  } else if (!isConnected) {
    dispatch({ type: 'DISCONNECTED' })
  } else if (transactionResponse) {
    if (!transactionResponse.isOk) {
      if (transactionResponse.message === 'user rejected') {
        dispatch({ type: 'CANCELED' })
      } else if (transactionResponse.message === 'unknown error') {
        dispatch({ type: 'WRONG' })
      } else if (!routes.length && transactionResponse.message === 'No routes found') {
        dispatch({ type: 'NO_ROUTES' })
      } else if (transactionResponse.message === 'Insufficient balance') {
        dispatch({ type: 'LOW_BALANCE' })
      } else {
        dispatch({
          type: 'SET_RESPONSE',
          payload: transactionResponse,
        })
      }
    } else if (transactionResponse.isOk) dispatch({ type: 'SUCCESS' })
  } else if (!from.amount || (from.amount && !routes.length)) {
    dispatch({ type: 'NO_AMOUNT' })
  } else if (balance && from.amount > parseFloat(balance)) {
    dispatch({ type: 'LOW_BALANCE' })
  } else if (from.amount && to.amount && routes.length) {
    dispatch({ type: 'SWAP' })
  }
}
