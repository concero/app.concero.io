import { useReducer } from 'react'

type EntityType = 'chain' | 'token'
type Entity = any // Replace with actual type

interface ListModalState {
	show: boolean
	entityType: EntityType
	data: Entity[]
}

type ListModalAction =
	| { type: 'SET_SHOW'; payload: boolean }
	| { type: 'SET_ENTITY_TYPE'; payload: EntityType }
	| { type: 'SET_DATA'; payload: Entity[] }
	| { type: 'SET_ENTITY'; payload: Entity }

const listModalReducer = (state: ListModalState, action: ListModalAction): ListModalState => {
	switch (action.type) {
		case 'SET_SHOW':
			return { ...state, show: action.payload }
		case 'SET_ENTITY_TYPE':
			return { ...state, entityType: action.payload }
		case 'SET_DATA':
			return { ...state, data: action.payload }
		case 'SET_ENTITY':
			// Additional logic can be implemented here
			return state
		default:
			return state
	}
}

const initialModalState: ListModalState = {
	show: false,
	entityType: 'chain',
	data: [],
}

export const useListModalReducer = () => useReducer(listModalReducer, initialModalState)
