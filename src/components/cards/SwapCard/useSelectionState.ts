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
type Direction = 'from' | 'to'

type SetChainAction = {
  type: 'setChain'
  direction: Direction
  payload: { name: string; symbol: string }
}

type SetTokenAction = {
  type: 'setToken'
  direction: Direction
  payload: { name: string; symbol: string }
}

type Action = SetChainAction | SetTokenAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setChain':
      return {
        ...state,
        [action.direction]: { ...state[action.direction], chain: action.payload },
      }
    case 'setToken':
      return {
        ...state,
        [action.direction]: { ...state[action.direction], token: action.payload },
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
