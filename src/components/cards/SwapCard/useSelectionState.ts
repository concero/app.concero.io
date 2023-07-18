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
  type: 'setChain'
  direction: Direction
  payload: { name: string; symbol: string; id: number }
}

type SetTokenAction = {
  type: 'setToken'
  direction: Direction
  payload: { name: string; symbol: string }
}

type SetAmountAction = {
  type: 'setAmount'
  direction: Direction
  payload: string
}

type Action = SetChainAction | SetTokenAction | SetAmountAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setChain':
      return {
        ...state,
        [action.direction]: { ...state[action.direction], chain: action.payload, token: tokens[action.payload.id][0] },
      }
    case 'setToken':
      return {
        ...state,
        [action.direction]: { ...state[action.direction], token: action.payload },
      }
    case 'setAmount':
      const tokenPriceUSD = tokens[state[action.direction].chain.id].find(
        (token) => token.symbol === state.from.token.symbol,
      )?.priceUSD

      return {
        ...state,
        [action.direction]: {
          ...state[action.direction],
          amount: action.payload,
          amount_usd: action.payload * tokenPriceUSD,
        },
      }
    default:
      return state
  }
}

export const useSelectionState = () => {
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

  return { selection, dispatch }
}
