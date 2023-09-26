import { Dispatch, useReducer } from 'react'
import { manageInitialState } from './manageInitialState'
import { StakingState } from '../../../../screens/StakingScreen/stakingReducer/types'
import { Status, SwapType } from '../constants'
import { addingTokenDecimals } from '../../../../../utils/formatting'
import { ManageAction, ManageState } from './types'

function manageReducer(state: ManageState, action: ManageAction): ManageState {
  switch (action.type) {
    case 'SET_MODAL_TYPE':
      return { ...state, modalType: action.payload }
    case 'SET_CHAIN': {
      return { ...state, [action.direction]: { ...state[action.direction], chain: action.payload, token: action.tokens[0] } }
    }
    case 'SET_TOKEN': {
      return { ...state, [action.direction]: { ...state[action.direction], token: action.payload } }
    }
    case 'SET_SWAP_TYPE':
      return { ...state, swapType: action.payload }
    case 'SET_AMOUNT':
      return { ...state, [action.direction]: { ...state[action.direction], amount: action.amount } }
    case 'SET_AMOUNT_USD':
      return { ...state, [action.direction]: { ...state[action.direction], amount_usd: action.amount } }
    case 'SET_ADDRESS':
      return { ...state, address: action.payload }
    case 'SET_CHAIN_BY_VAULT':
      const { chain, chainId, symbol, logoURI } = action.payload
      return { ...state, [action.direction]: { ...state.to, chain: { id: chainId, symbol, name: chain, logoURI } } }
    case 'SET_ROUTE':
      if (action.fromAmount.toString() !== state.from.amount.toString()) return state
      return {
        ...state,
        route: action.payload,
        status: Status.swap,
        from: {
          ...state.from,
          amount_usd: action.payload.fromTokenAmountUsdValue,
        },
        to: {
          ...state.to,
          amount: addingTokenDecimals(parseFloat(action.payload.toTokenAmount), parseFloat(state.to.token.decimals)),
          amount_usd: action.payload.toTokenAmountUsdValue,
        },
      }
    case 'CLEAR_ROUTE':
      return { ...state, route: null }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_STATUS':
      if (!state.from.amount) return { ...state, status: Status.input }
      return { ...state, status: action.payload }
    case 'SET_BALANCE':
      return { ...state, balance: action.payload }
    case 'SET_WITHDRAW_TYPE':
      return {
        ...state,
        swapType: SwapType.withdraw,
        from: { ...state.to, amount: '', amount_usd: '' },
        to: { token: action.token, chain: { ...state.to.chain, logoURI: '' }, amount: '', amount_usd: '' },
        route: null,
      }
    case 'SET_STAKE_TYPE':
      return { ...state, swapType: SwapType.stake, from: { ...state.to, amount: '' }, to: { ...state.from, amount: '' }, route: null }
    case 'SET_TO_SELECTION':
      return {
        ...state,
        to: {
          ...state.to,
          token: {
            name: action.payload.name,
            symbol: action.payload.widoSymbol,
            logoURI: action.payload.logoURI,
            address: action.payload.widoAddress,
            decimals: action.payload.decimals,
          },
          chain: {
            name: action.payload.chain,
            symbol: action.payload.widoSymbol,
            logoURI: action.payload.logoURI,
            id: action.payload.chainId,
          },
        },
      }
    case 'RESET':
      return manageInitialState(action.payload)
    default:
      return new Error(`Unhandled action type`)
  }
}

export function useManageReducer(stakingState: StakingState): [ManageState, Dispatch<ManageAction>] {
  const initState = manageInitialState(stakingState)
  const [manageState, manageDispatch] = useReducer(manageReducer, initState)
  return [manageState, manageDispatch]
}
