import { Route, Step } from '../../../api/lifi/types'

export interface SwapCardProps {}

export interface SwapDetailsProps {
  selection: {
    from: Selection
    to: Selection
  }
  selectedRoute: Route
  setSelectedRoute: (route: Route) => void
  routes: Route[]
  isLoading: boolean
}

export interface Selection {
  chain: Chain
  token: Token
}

export interface Token {
  name: string
  symbol: string
}

export interface Chain {
  name: string
  symbol: string
}

export interface RouteButtonProps {
  route: Route
  onClick: () => void
}

export interface AvatarsProps {
  entities: Step[]
}

// SWAP REDUCER TYPES

export type State = {
  from: {
    chain: { name: string; symbol: string }
    token: { name: string; symbol: string }
    amount: string
  }
  to: {
    chain: { name: string; symbol: string }
    token: { name: string; symbol: string }
    amount?: string
  }
  routes: any[]
  isLoading: boolean
  selectedRoute: any
  originalRoutes: any[]
  typingTimeout: number
}

type Direction = 'from' | 'to'

export type SetRoutesAction = {
  type: 'SET_ROUTES'
  payload: any[]
}

export type PopulateRoutesAction = {
  type: 'POPULATE_ROUTES'
  payload: any
}

export type ClearRoutesAction = {
  type: 'CLEAR_ROUTES'
}

export type SetLoadingAction = {
  type: 'SET_LOADING'
  payload: boolean
}

export type SetSelectedRouteAction = {
  type: 'SET_SELECTED_ROUTE'
  payload: any
}

export type SetOriginalRoutesAction = {
  type: 'SET_ORIGINAL_ROUTES'
  payload: any[]
}

export type SetTypingTimeoutAction = {
  type: 'SET_TYPING_TIMEOUT'
  payload: number
}

export type SetAmountAction = {
  type: 'SET_AMOUNT'
  direction: Direction
  payload: { amount?: string; amount_usd?: number }
}

export type ResetAmountsAction = {
  type: 'RESET_AMOUNTS'
  direction: Direction
}

export type SetChainAction = {
  type: 'SET_CHAIN'
  direction: Direction
  payload: { name: string; symbol: string; id: number }
}

export type SetTokenAction = {
  type: 'SET_TOKEN'
  direction: Direction
  payload: { name: string; symbol: string }
}

export type SetFromAmountAction = {
  type: 'setFromAmount'
  direction: Direction
  payload: string
}

export type SetToAmountAction = {
  type: 'setToAmount'
  direction: Direction
  payload: string
}

export type SetFromAmountUSDAction = {
  type: 'setFromAmountUSD'
  direction: Direction
  payload: number
}

export type Action =
  | SetChainAction
  | SetTokenAction
  | SetFromAmountAction
  | SetToAmountAction
  | SetFromAmountUSDAction
  | SetRoutesAction
  | PopulateRoutesAction
  | ClearRoutesAction
  | SetLoadingAction
  | SetSelectedRouteAction
  | SetOriginalRoutesAction
  | SetTypingTimeoutAction
  | SetAmountAction
  | ResetAmountsAction
