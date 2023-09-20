import { Chain } from '../../../cards/SwapCard/types'

export interface StakingState {
  filter: Filter
  vaults: Vault[] | []
  selectedVault: Vault | null
  chains: Chain[]
  address: string | null
  loading: boolean
}

export type Filter = {
  search: string
  all: boolean
  my_holdings: boolean
  compound: boolean
  chains: string[]
  apy: string
  category: string[]
}

export type Vault = {
  _id: string
  address: string
  widoAddress: string
  apy: number
  apyBase: number
  apyBase7d: number
  apyBaseInception: number
  apyMean30d: number
  apyPct1D: number
  apyPct7D: number
  apyPct30D: number
  apyReward: number
  chain: string
  chainId: string
  count: number
  category: string
  defiLlamaPoolId: string
  exposure: string
  il7d: number
  ilRisk: string
  logoURI: string
  mu: number
  name: string
  outlier: boolean
  poolMeta: string
  predictions: {
    predictedClass: string
    predictedProbability: number
    binnedConfidence: number
  }
  protocolId: string
  protocolName: string
  rewardTokens: string[]
  sigma: number
  stablecoin: string
  symbol: string
  tvlUsd: number
  inputTokens: InputTokens[]
  volumeUsd1d: number
  volumeUsd7d: number
  widoSupported: boolean
}

export type InputTokens = {
  _id: string
  name: string
  symbol: string
  logoURI: string
}
