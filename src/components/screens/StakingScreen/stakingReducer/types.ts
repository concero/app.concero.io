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
  compound: boolean
  chains: string[]
  apy: string
}

export type Vault = {
  _id: string
  contractAddress: string
  apy: number
  apyBase: number
  apyBase7d: number
  apyBaseInception: number
  apyMean30d: number
  apyPct1D: number
  apyPct7D: number
  apyReward: number
  chain: string
  count: number
  defiLlamaPoolId: string
  exposure: string
  il7d: number
  ilRisk: string
  logoURI: string
  mu: number
  name: string
  outlier: boolean
  poolMeta: string
  prediction: {
    predictedClass: string
    predictedProbability: number
    binnedConfidence: number
  }
  protocolId: string
  protocolName: string
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
