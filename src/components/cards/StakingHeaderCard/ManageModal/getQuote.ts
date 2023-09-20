import { Dispatch } from 'react'
import { fetchQuote } from '../../../../api/wido/fetchQuote'
import { ManageState } from './useManageReducer/types'
import { clearRoute } from './clearRoute'

interface IGetQuote {
  manageState: ManageState
  manageDispatch: Dispatch<any>
  typingTimeoutRef: React.MutableRefObject<any>
}

async function handleFetchQoute(manageState: ManageState, manageDispatch: Dispatch<any>) {
  manageDispatch({ type: 'SET_LOADING', payload: true })
  try {
    const route = await fetchQuote(manageState)
    if (!route) return
    manageDispatch({ type: 'SET_ROUTE', payload: route, fromAmount: manageState.from.amount })
    manageDispatch({ type: 'SET_AMOUNT', payload: route.toTokenAmountUsdValue, direction: 'to' })
  } catch (error) {
    console.error(error)
  } finally {
    manageDispatch({ type: 'SET_LOADING', payload: false })
  }
}

export async function getQuote({ manageState, manageDispatch, typingTimeoutRef }: IGetQuote) {
  if (!parseFloat(manageState.from.amount)) return clearRoute(manageDispatch, typingTimeoutRef)

  try {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    const typingTimeoutId = setTimeout(() => handleFetchQoute(manageState, manageDispatch), 700)
    typingTimeoutRef.current = typingTimeoutId
  } catch (error) {
    console.error('[getQuote] ', error)
  }
}
