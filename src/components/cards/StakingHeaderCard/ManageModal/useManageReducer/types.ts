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
  fee_bps: number
  fee_in_from_token: number
  from_token_amount: string
  is_supported: boolean
  steps: {
    chainId: number
    fromToken: string
    functionName: string
    protocol: string
    swapAddress: string
    toChainId: number
    toToken: string
  }[]
  to_token_amount: string
  steps_count: number
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
}
