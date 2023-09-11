import { useReducer } from 'react'

export const initialState = (selection) => ({
  data: [],
  timestamp: 0,
  isModalVisible: false,
  selectedToken: selection.swapCard.to.token,
  isLoading: false,
  items: [],
  modalIsOpen: false,
  modalData: null,
  error: null,
})

export function historyReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_TIMESTAMP':
      return { ...state, timestamp: action.payload }
    case 'SET_MODAL_VISIBILITY':
      return { ...state, isModalVisible: action.payload }
    case 'SET_SELECTED_TOKEN':
      return { ...state, selectedToken: action.payload }
    case 'SET_ITEMS':
      return { ...state, items: action.payload }
    case 'SET_MODAL_OPEN':
      return { ...state, modalIsOpen: action.payload }
    case 'SET_MODAL_DATA':
      return { ...state, modalData: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const useHistoryReducer = (selection) => {
  const [state, dispatch] = useReducer(historyReducer, initialState(selection))
  return [state, dispatch]
}
