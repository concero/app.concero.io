export interface TokenAreaProps {
  direction: 'to' | 'from'
  selection: Selection
  balance?: number
  swapDispatch: any
}

type Selection = {
  chain: {
    name: string
    symbol: string
  }
  token: {
    name: string
    symbol: string
  }
  amount: string
  amount_usd: string
}
