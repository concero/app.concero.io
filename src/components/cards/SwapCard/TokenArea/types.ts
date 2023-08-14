export interface TokenAreaProps {
  direction: 'to' | 'from'
  selection: Selection
  dispatch: any
  balance?: string
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
