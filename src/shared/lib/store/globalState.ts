import { useSyncExternalStore } from 'react'

type GlobalEventsMap = {
	SHOW_TERMS_MODAL: { type: 'SHOW_TERMS_MODAL' }
}

type GlobalEvent = GlobalEventsMap[keyof GlobalEventsMap]

class EventEmitter {
	private state = { lastEvent: null as GlobalEvent | null }
	private listeners = new Set<() => void>()

	getState = () => this.state
	subscribe = (listener: () => void) => {
		this.listeners.add(listener)
		return () => this.listeners.delete(listener)
	}

	_dispatch = (event: GlobalEvent) => {
		this.state = { ...this.state, lastEvent: event }
		this.listeners.forEach(fn => fn())
	}
}

const emitter = new EventEmitter()

export const GlobalEventsDispatcher = {
	showTermsModal: () => emitter._dispatch({ type: 'SHOW_TERMS_MODAL' }),
}

export const useGlobalEvent = <T extends keyof GlobalEventsMap>(eventType: T): GlobalEventsMap[T] | null => {
	const state = useSyncExternalStore(emitter.subscribe, emitter.getState)
	return state.lastEvent?.type === eventType ? (state.lastEvent as GlobalEventsMap[T]) : null
}
