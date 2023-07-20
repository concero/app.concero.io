import { useReducer } from 'react'
import { chains } from '../../../constants/chains'
import { tokens } from '../../../constants/tokens'

type State = {
  from: {
    chain: { name: string; symbol: string }
    token: { name: string; symbol: string }
    amount: string
  }
  to: {
    chain: { name: string; symbol: string }
    token: { name: string; symbol: string }
  }
}

type Direction = 'from' | 'to'

type SetChainAction = {
  type: 'SET_CHAIN'
  direction: Direction
  payload: { name: string; symbol: string; id: number }
}

type SetTokenAction = {
  type: 'SET_TOKEN'
  direction: Direction
  payload: { name: string; symbol: string }
}

type SetFromAmountAction = {
  type: 'setFromAmount'
  direction: Direction
  payload: string
}

type SetToAmountAction = {
  type: 'setToAmount'
  direction: Direction
  payload: string
}

type SetFromAmountUSDAction = {
  type: 'setFromAmountUSD'
  direction: Direction
  payload: number
}

type Action = SetChainAction | SetTokenAction | SetFromAmountAction | SetToAmountAction | SetFromAmountUSDAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CHAIN':
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          chain: action.payload,
          token: tokens[action.payload.id][0],
        },
      }
    case 'SET_TOKEN':
      return {
        ...state,
        [action.direction]: { ...state[action.direction], token: action.payload },
      }
    case 'setFromAmount':
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          amount: action.payload,
        },
      }
    case 'setFromAmountUSD':
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          amount_usd: parseFloat(action.payload).toFixed(2).toString(),
        },
      }
    case 'setToAmount':
      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          amount: action.payload.amount,
          amount_usd: action.payload.amount_usd,
        },
      }
    default:
      return state
  }
}

export const useCoinSelectionReducer = () => {
  const [selection, dispatch] = useReducer(reducer, {
    from: {
      chain: { name: chains[0].name, symbol: chains[0].symbol, id: chains[0].id, logoURI: chains[0].logoURI },
      token: {
        name: chains[0].nativeToken.name,
        symbol: chains[0].nativeToken.symbol,
        address: chains[0].nativeToken.address,
        logoURI: chains[0].nativeToken.logoURI,
      },
      amount: 0,
      amount_usd: 0.0,
      address: '',
    },
    to: {
      chain: { name: chains[1].name, symbol: chains[1].symbol, id: chains[1].id, logoURI: chains[1].logoURI },
      token: {
        name: chains[1].nativeToken.name,
        symbol: chains[1].nativeToken.symbol,
        address: chains[1].nativeToken.address,
        logoURI: chains[1].nativeToken.logoURI,
      },
      amount: 0,
      amount_usd: 0.0,
      address: '',
    },
  })

  return [selection, dispatch]
}
