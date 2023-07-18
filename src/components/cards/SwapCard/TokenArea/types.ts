export interface TokenAreaProps {
  direction: 'to' | 'from'

  selection: {
    chain: {
      name: string
      symbol: string
    }
    token: {
      name: string
      symbol: string
    }
  }
  dispatch: any
}
