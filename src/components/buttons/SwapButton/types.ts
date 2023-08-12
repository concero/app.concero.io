export interface SwapButtonProps {
  from: any
  to: any
  isConnected: boolean
  isLoading: boolean
  routes: any[]
  onClick: () => void
  balance: string
  transactionResponse: any[]
}

export type From = {
  amount: number
  token: {
    amount: number
    amount_usd: number
  }
}

export type To = {
  amount: number
  token: {
    amount: number
    amount_usd: number
  }
}

export type Dispatch = (action: { type: string }) => void
