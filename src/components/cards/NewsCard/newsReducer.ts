import { useReducer } from 'react'
import { lifiTokens } from '../../../constants/lifiTokens'

export const initialState = (selection) => ({
  data: [],
  isLoading: false,
  timestamp: 0,
  isModalVisible: false,
  selectedToken: selection.swapCard.to.token,
  mappedTokens: lifiTokens['1'].slice(0, 50),
})

export function newsReducer(state, action) {
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
    case 'ADD_MAPPED_TOKENS':
      return { ...state, mappedTokens: [...state.mappedTokens, ...action.payload] }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const useNewsReducer = (selection) => {
  const [state, dispatch] = useReducer(newsReducer, initialState(selection))
  return [state, dispatch]
}
