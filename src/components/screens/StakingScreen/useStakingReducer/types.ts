export interface InitialState {
  vaults: Vaults[] | []
  protocol: Protocol
}

type Vaults = {
  id: string
  name: string
  type: 'staking' | 'lp' | 'alm' | 'dex' | 'lending' | ''
  protocol: {
    name: string
    id: string
  }
  total_apy: string
  total_fees_usd: string
  yields: Yields[]
  fees: Fees[]
  tags: string[]
  underlying_assets: Yields[]
  min_deposit: string
  min_withdrawal: string
  max_withdrawal: string
  max_deposit: string
}

type Yields = {
  chain_id: string
  name: string
  symbol: string
  address: string
  decimals: number
  logo: string
  apy: number
}

type Fees = {
  fee_bps: number
  fee_type: string
  fee_description: string
}

type Protocol = {
  id: string
  name: string
  description: string
  logo_url: string
  tvl_usd: string
}
