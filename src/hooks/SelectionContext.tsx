import { createContext, ReactNode, useReducer } from 'react'
import { lifiTokens } from '../constants/lifiTokens'
import { chains } from '../constants/chains'

export const SelectionContext = createContext(null)

type SelectedTokens = {
  from: {
    chain: {
      id: number
      name: string
      symbol: string
      logoURI: string
    }
    token: {
      symbol: string
      address: string
      logoURI: string
    }
  }
  to: {
    chain: {
      id: number
      name: string
      symbol: string
      logoURI: string
    }
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
  children: ReactNode
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HISTORY_CARD':
      return {
        ...state,
        historyCard: action.payload,
      }
    case 'SET_SWAP_CARD':
      return {
        ...state,
        swapCard: action.payload,
      }
    default:
      return state
  }
}

const selectedTokens: SelectedTokens = {
  from: {
    chain: {
      id: 1,
      name: chains[0].name,
      symbol: chains[0].symbol,
      logoURI: chains[0].logoURI,
    },
    token: {
      symbol: lifiTokens['1'][0].symbol,
      address: lifiTokens['1'][0].address,
      logoURI: lifiTokens['1'][0].logoURI,
    },
  },
  to: {
    chain: {
      id: 137,
      name: chains[1].name,
      symbol: chains[1].symbol,
      logoURI: chains[1].logoURI,
    },
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

  return (
    <SelectionContext.Provider
      value={{
        selection,
        dispatch,
      }}
    >
      {children}
    </SelectionContext.Provider>
  )
}
