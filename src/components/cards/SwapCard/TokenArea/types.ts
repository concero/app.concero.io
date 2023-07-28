export interface TokenAreaProps {
  direction: 'to' | 'from'
  address: string
  selection: {
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
  dispatch: any
}
