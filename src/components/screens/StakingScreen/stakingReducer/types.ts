import { Chain } from '../../../cards/SwapCard/types'
import { Address } from 'viem'

export type Filter = {
	search: string
	all: boolean
	my_holdings: boolean
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
	decimals: number
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
	widoSymbol: string
	tvlUsd: number
	inputTokens: InputTokens[]
	volumeUsd1d: number
	volumeUsd7d: number
	widoSupported: boolean
	stakedAmount?: string
}

export type InputTokens = {
	_id: string
	name: string
	symbol: string
	logoURI: string
}

export enum FilterCategory {
	all = 'all',
	my_holdings = 'my_holdings',
	chains = 'chains',
	apy = 'apy',
	category = 'category',
}

export interface StakingState {
	filter: Filter
	vaults: Vault[] | []
	selectedVault: Vault | null
	chains: Chain[]
	address: Address
	loading: boolean
	balances: { [key: string]: string | null }
}

export type StakingAction =
	| { type: 'SET_FILTER'; payload: { filter: FilterCategory; value: boolean | string | [] | string[] } }
	| { type: 'SET_SELECTED_VAULT'; payload: any }
	| { type: 'SET_VAULTS'; payload: Vault[] }
	| { type: 'PUSH_VAULTS'; payload: Vault[] }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_BALANCES'; payload: { [key: string]: string | null } }
	| { type: 'SET_ADDRESS'; payload: Address }
