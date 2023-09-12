import { createContext, ReactNode, useContext, useReducer } from 'react'
import { DataContext } from './DataContext/DataContext'

type SelectedTokens = {
  from: {
    chain: {
      id: number
      name: string
      symbol: string
      logoURI: string
    }
    token: {
      name: string
      symbol: string
      address: string
      logoURI: string
      coinGeckoId: string
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
      name: string
      symbol: string
      address: string
      logoURI: string
      coinGeckoId: string
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
  setIsLoading: (isLoading: boolean) => void
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
    case 'SET_SELECTION':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const selectedTokens = ({ fromTokens, toTokens, chains }) => ({
  from: {
    chain: {
      id: 1,
      name: chains[0].name,
      symbol: chains[0].symbol,
      logoURI: chains[0].logoURI,
      provider_symbols: chains[0].provider_symbols,
    },
    token: {
      symbol: fromTokens[0].symbol,
      address: fromTokens[0].address,
      decimals: fromTokens[0].decimals,
      logoURI: fromTokens[0].logoURI,
      coinGeckoId: fromTokens[0].coinGeckoId,
    },
  },
  to: {
    chain: {
      id: 137,
      name: chains[1].name,
      symbol: chains[1].symbol,
      logoURI: chains[1].logoURI,
      provider_symbols: chains[1].provider_symbols,
    },
    token: {
      symbol: toTokens[0].symbol,
      address: toTokens[0].address,
      decimals: toTokens[0].decimals,
      logoURI: toTokens[0].logoURI,
      coinGeckoId: toTokens[0].coinGeckoId,
    },
  },
})

const initArgs = ({ fromTokens, toTokens, chains }) => {
  return {
    swapCard: selectedTokens({ fromTokens, toTokens, chains }),
    historyCard: selectedTokens({ fromTokens, toTokens, chains }),
    newsCard: selectedTokens({ fromTokens, toTokens, chains }),
  }
}

export const SelectionContext = createContext(null)

export function SelectionProvider({ children }: SelectionProviderProps) {
  const { tokens, chains, getTokens, getChains } = useContext(DataContext)

  const [selection, dispatch] = useReducer(reducer, initArgs({ fromTokens: tokens['1'], toTokens: tokens['137'], chains }))

  // const fetchData = async () => {
  //   console.log('selectionContext fetchData')
  //   try {
  //     const [fromTokens, toTokens, chains] = await Promise.all([getTokens('1'), getTokens('137'), getChains()])
  //     const selectionArgs = initArgs({ fromTokens, toTokens, chains })
  //     console.log('selectionArgs', selectionArgs)
  //     dispatch({ type: 'SET_SELECTION', payload: selectionArgs })
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   } finally {
  //   }
  // }
  //
  // useEffect(() => {
  //   fetchData()
  // }, [])

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
