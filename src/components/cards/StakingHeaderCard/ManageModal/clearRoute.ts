import { Dispatch } from 'react'
import { Status } from './constants'

export function clearRoute(manageDispatch: Dispatch<any>, typingTimout: React.MutableRefObject<any>) {
  if (typingTimout.current) clearTimeout(typingTimout.current)
  manageDispatch({ type: 'SET_ROUTE', payload: null })
  manageDispatch({ type: 'SET_AMOUNT', direction: 'to', amount: '' })
  manageDispatch({ type: 'SET_AMOUNT', direction: 'from', amount: '' })
  manageDispatch({ type: 'SET_LOADING', payload: false })
  manageDispatch({ type: 'SET_STATUS', payload: Status.input })
}
