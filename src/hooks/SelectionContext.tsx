import { createContext, useReducer } from 'react'
import { tokens } from '../constants/tokens'
import { chains } from '../constants/chains'

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
    chainId: chains[0].id,
    token: {
      symbol: tokens['1'][0].symbol,
      address: tokens['1'][0].address,
      logoURI: tokens['1'][0].logoURI,
    },
  },
  to: {
    chainId: chains[1].id,
    token: {
      symbol: tokens['137'][1].symbol,
      address: tokens['137'][1].address,
      logoURI: tokens['137'][1].logoURI,
    },
  },
}

const initArgs: SelectionState = {
  swapCard: selectedTokens,
  historyCard: selectedTokens,
  newsCard: selectedTokens,
}

export const SelectionProvider = ({ children }: SelectionProviderProps) => {
  const [selection, dispatch] = useReducer(reducer, initArgs)

  return <SelectionContext.Provider value={{ selection, dispatch }}>{children}</SelectionContext.Provider>
}
