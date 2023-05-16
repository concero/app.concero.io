import { useReducer } from 'react'

type State = {
  from: {
    chain: { name: string; symbol: string }
    token: { name: string; symbol: string }
  }
  to: {
    chain: { name: string; symbol: string }
    token: { name: string; symbol: string }
  }
}

type Action =
  | { type: 'setFromChain'; payload: { name: string; symbol: string } }
  | { type: 'setFromToken'; payload: { name: string; symbol: string } }
  | { type: 'setToChain'; payload: { name: string; symbol: string } }
  | { type: 'setToToken'; payload: { name: string; symbol: string } }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setFromChain':
      return {
        ...state,
        from: { ...state.from, chain: action.payload },
      }
    case 'setFromToken':
      return {
        ...state,
        from: { ...state.from, token: action.payload },
      }
    case 'setToChain':
      return {
        ...state,
        to: { ...state.to, chain: action.payload },
      }
    case 'setToToken':
      return {
        ...state,
        to: { ...state.to, token: action.payload },
      }
    default:
      return state
  }
}

export const useSelectionState = () => {
  const [selection, dispatch] = useReducer(reducer, {
    from: {
      chain: { name: 'Binance Smart Chain', symbol: 'BSC' },
      token: { name: 'BNB', symbol: 'BNB' },
    },
    to: {
      chain: { name: 'Ethereum', symbol: 'ETH' },
      token: { name: 'Tether', symbol: 'USDT' },
    },
  })

  return { selection, dispatch }
}
