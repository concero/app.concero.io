export interface Route {
  id: string
  from: {
    token: {
      name: string
      address: string
      symbol: string
      decimals: number
      price_usd: string
      amount: string
      amount_usd: string
    }
    chain: {
      id: number
    }
  }
  to: {
    token: {
      name: string
      address: string
      symbol: string
      decimals: number
      price_usd: string
      amount: string
      amount_usd: string
      amount_min: string
    }
    chain: {
      id: number
    }
  }
  steps: Step[]
  cost: {
    total_usd: number
    total_gas_usd: number
  }
  tags: string[]
  slippage_percent: number
  transaction_time_seconds: number
}

export type Step = {
  id: string
  from: {
    token: {
      name: string
      address: string
      symbol: string
      decimals: number
      price_usd: string
      amount: string
      logo_uri: string
    }
    chain: {
      id: number
    }
  }
  to: {
    token: {
      name: string
      address: string
      symbol: string
      decimals: number
      price_usd: string
      amount: string
      logo_uri: string | undefined
    }
    chain: {
      id: number
    }
  }
  tool: {
    name: string
    estimated_execution_time_seconds: number
    slippage_limit: number
    fees: number
    fees_usd: number
    gas: number
    gas_usd: number
    logo_uri: string
  }
}

export interface FetchRoutesParams {
  from: {
    chain: {
      id: number
    }
    token: {
      name: string
      address: string
      symbol: string
    }
    address: string
    amount: string
  }
  to: {
    chain: {
      id: number
    }
    token: {
      name: string
      address: string
      symbol: string
    }
    address: string
  }
}
