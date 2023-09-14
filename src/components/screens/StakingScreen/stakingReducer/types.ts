import { Chain } from '../../../cards/SwapCard/types'

export interface StakingState {
  filter: Filter
  vaults: Vault[] | []
  selectedVault: Vaults | null
  chains: Chain[]
  userBalances: UserBalance[]
}

export type UserBalance = {
  chainId: number
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
  balance: string
  balanceUsdValue: string
  usdPrice: stirng
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
  rewardTokens: string[]
  sigma: number
  stablecoin: string
  symbol: string
  tvlUsd: number
  underlyingTokens: string[]
  volumeUsd1d: number
  volumeUsd7d: number
  widoSupported: boolean
}
