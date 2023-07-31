import { createContext, useReducer } from 'react'
import { lifiTokens } from '../constants/lifiTokens'

export const SelectionContext = createContext(null)

type SelectedTokens = {
  from: {
    chainId: number
    token: {
      symbol: string
      address: string
      logoURI: string
    }
  }
  to: {
    chainId: number
    token: {
      symbol: string
      address: string
      logoURI: string
    }
  }
}

interface SelectionState {
  swapCard: SelectedTokens
  historyCard: SelectedTokens
  newsCard: SelectedTokens
}

interface SelectionProviderProps {
  children: React.ReactNode
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HISTORY_CARD':
      return { ...state, historyCard: action.payload }
    default:
      return state
  }
}

const selectedTokens: SelectedTokens = {
  from: {
    chainId: 1,
    token: {
      symbol: lifiTokens['1'][0].symbol,
      address: lifiTokens['1'][0].address,
      logoURI: lifiTokens['1'][0].logoURI,
    },
  },
  to: {
    chainId: 137,
    token: {
      symbol: lifiTokens['137'][0].symbol,
      address: lifiTokens['137'][0].address,
      logoURI: lifiTokens['137'][0].logoURI,
    },
  },
}

const initArgs: SelectionState = {
  swapCard: selectedTokens,
  historyCard: selectedTokens,
  newsCard: selectedTokens,
}

export function SelectionProvider({ children }: SelectionProviderProps) {
  const [selection, dispatch] = useReducer(reducer, initArgs)

  return <SelectionContext.Provider value={{ selection, dispatch }}>{children}</SelectionContext.Provider>
}
