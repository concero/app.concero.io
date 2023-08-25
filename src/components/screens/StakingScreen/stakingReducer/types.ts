export interface InitialState {
  filter: Filter
  vaults: Vault[] | []
  selectedVault: Vaults | null
  protocols: Protocol
}

export type Filter = {
  search: string
  all: boolean
  my_holdings: boolean
  types: string[]
  insurable: boolean
  compound: boolean
  sort: string
}

export type Vault = {
  id: string
  name: string
  type: 'staking' | 'lp' | 'alm' | 'dex' | 'lending' | ''
  protocol_id: string
  total_apy: string
  total_fees_usd: string
  yields: Yields[]
  fees: Fees[]
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

export type Protocol = {
  [key: string]: {
    id: string
    name: string
    description: string
    logo_url: string
    tvl_usd: string
  }
}
