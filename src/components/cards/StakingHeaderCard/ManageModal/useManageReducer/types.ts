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
