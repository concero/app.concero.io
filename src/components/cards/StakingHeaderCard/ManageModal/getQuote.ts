import { Dispatch, MutableRefObject } from 'react'
import { fetchQuote } from '../../../../api/wido/fetchQuote'
import { ManageState } from './useManageReducer/types'
import { clearRoute } from './clearRoute'
import { Status } from './constants'

interface IGetQuote {
  manageState: ManageState
  manageDispatch: Dispatch<any>
  typingTimeoutRef: MutableRefObject<any>
}

function handleError(error: Error, manageDispatch: Dispatch<any>) {
  if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
    manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
  } else {
    manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
  }
}

async function handleFetchQuote(manageState: ManageState, manageDispatch: Dispatch<any>) {
  manageDispatch({ type: 'SET_LOADING', payload: true })
  manageDispatch({ type: 'SET_STATUS', payload: Status.loading })
  try {
    const route = await fetchQuote(manageState)
    if (!route) return manageDispatch({ type: 'SET_STATUS', payload: Status.noRoute })
    manageDispatch({ type: 'SET_ROUTE', payload: route, fromAmount: manageState.from.amount })
    manageDispatch({ type: 'SET_AMOUNT', payload: route.toTokenAmountUsdValue, direction: 'to' })
  } catch (error) {
    console.log(error)
    handleError(error, manageDispatch)
  } finally {
    manageDispatch({ type: 'SET_LOADING', payload: false })
  }
}

export async function getQuote({ manageState, manageDispatch, typingTimeoutRef }: IGetQuote) {
  if (!parseFloat(manageState.from.amount)) return clearRoute(manageDispatch, typingTimeoutRef)

  try {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    const typingTimeoutId = setTimeout(() => handleFetchQuote(manageState, manageDispatch), 700)
    typingTimeoutRef.current = typingTimeoutId
  } catch (error) {
    console.error('[getQuote] ', error)
  }
}
