import { type Dispatch } from 'react'
import { ModalType, Status } from './constants'

export function clearRoute(manageDispatch: Dispatch<any>, typingTimout: React.MutableRefObject<any>) {
	if (typingTimout.current) clearTimeout(typingTimout.current)
	manageDispatch({ type: 'CLEAR_ROUTE' })
	manageDispatch({ type: 'SET_AMOUNT', direction: 'to', amount: '' })
	manageDispatch({ type: 'SET_AMOUNT', direction: 'from', amount: '' })
	manageDispatch({ type: 'SET_AMOUNT_USD', direction: 'from', amount: null })
	manageDispatch({ type: 'SET_AMOUNT_USD', direction: 'to', amount: null })
	manageDispatch({ type: 'SET_LOADING', payload: false })
	manageDispatch({ type: 'SET_STATUS', payload: Status.input })
	manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.input })
	manageDispatch({ type: 'SET_STEPS', steps: [] })
}
