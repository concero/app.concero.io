import { ModalType } from '../constants'

interface Token {
  name: string
  symbol: string
  logoURI: string
  address: string
  decimals: number
}

interface Chain {
  name: string
  symbol: string
  logoURI: string
  id: number
}

interface Route {
  feeBps: number
  feeUsdValue: string
  isSupported: boolean
  price: number
  expectedSlippage: number
  steps: {
    chainId: number
    fromToken: string
    functionName: string
    protocol: string
    swapAddress: string
    toChainId: number
    toToken: string
  }[]
  toTokenAmount: string
  steps_count: number
  data: string
  to: string
  value: string
}

export interface ManageState {
  from: {
    amount: string
    amount_usd: string
    token: Token
    chain: Chain
  }
  to: {
    amount: string
    amount_usd: string
    token: Token
    chain: Chain
  }
  snake: boolean
  modalType: ModalType
  direction: string
  route: Route
  swapType: number
  address: string
  isLoading: boolean
  status: number
  balance: string | null
}

export type ManageAction =
  | { type: 'SET_MODAL_TYPE'; payload: ModalType }
  | { type: 'SET_CHAIN'; direction: string; payload: any; tokens: any[] }
  | { type: 'SET_TOKEN'; direction: string; payload: any }
  | { type: 'SET_SWAP_TYPE'; payload: string }
  | { type: 'SET_AMOUNT'; direction: string; amount: number }
  | { type: 'SET_AMOUNT_USD'; direction: string; amount: number }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_CHAIN_BY_VAULT'; direction: string; payload: any }
  | { type: 'SET_ROUTE'; fromAmount: number; payload: any }
  | { type: 'CLEAR_ROUTE' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STATUS'; payload: string }
  | { type: 'SET_BALANCE'; payload: number }
  | { type: 'SWITCH_SWAP_TYPE' }
  | { type: 'SET_TO_SELECTION'; payload: any }
  | { type: 'RESET'; payload: any }
