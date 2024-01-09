import { type Chain } from '../../../cards/SwapCard/types'
import { type Address } from 'viem'

export interface Filter {
	search: string
	all: boolean
	my_holdings: boolean
	my_positions: boolean
	chains: Chain[]
	apy: string
	category: string[]
}

interface ITokenInfo {
	_id: string
	name: string
	symbol: string
	logoURI: string
}

interface IPredictions {
	predictedClass: string
	predictedProbability: number
	binnedConfidence: number
}

interface IData {
	category?: string
	symbols?: string[]
	vault_token?: {
		address?: string
		name?: string
		symbol?: string
		decimals?: number
	}
	project_id?: string
	project_name?: string
	chain_name?: string
	apy?: number
	apyBase?: number
	apyReward?: number
	apyPct1D?: number
	apyPct7D?: number
	apyPct30D?: number
	apyMean30d?: number
	apyBase7d?: number
	volumeUsd1d?: number
	volumeUsd7d?: number
	tvlUsd?: number
	is_stablecoin?: boolean
	il_risk?: string
	exposure?: string
	predictions?: IPredictions
	mu?: string
	sigma?: string
	count?: string
	is_outlier?: boolean
	il7d?: string
	apyBaseInception?: string
	defiLlamaPoolId?: string
	defiLlamaUnderlyingTokens?: string[]
	defiLlamaRewardTokens?: string[]
	underlyingTokens?: string[]
	subtitle?: string
	chain: {
		_id?: string
		id?: string
		name?: string
		symbol?: string
		logoURI?: string
	}
}
interface IProviderInfo {
	id?: string
	poolAddress?: string
	primaryAddress?: string
	tokenAddress?: string
}

export interface Vault {
	_id: string
	address?: string
	address_normalized?: string
	chain_id: string
	decimals?: number
	symbol?: string
	name?: string
	input_tokens?: ITokenInfo[]
	reward_tokens?: ITokenInfo[]
	data?: IData
	project: {
		_id?: string
		name?: string
		logoURI?: string
		category?: string
	}
	providers?: {
		enso?: IProviderInfo
		wido?: IProviderInfo
	}
	// front-end
	stakedAmount?: string
}

export interface InputTokens {
	_id: string
	name: string
	symbol: string
	logoURI: string
}

export enum FilterCategory {
	all = 'all',
	my_holdings = 'my_holdings',
	my_positions = 'my_positions',
	chains = 'chains',
	apy = 'apy',
	category = 'category',
}

export interface EarnState {
	filter: Filter
	vaults: Vault[] | []
	selectedVault: Vault | null
	chains: Chain[]
	address: Address
	loading: boolean
	balances: Record<string, string | null>
}

export type EarnAction =
	| { type: 'SET_FILTER'; payload: { filter: FilterCategory; value: boolean | string | [] | string[] } }
	| { type: 'SET_SELECTED_VAULT'; payload: any }
	| { type: 'SET_VAULTS'; payload: Vault[] }
	| { type: 'PUSH_VAULTS'; payload: Vault[] }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_BALANCES'; payload: Record<string, string | null> }
	| { type: 'SET_ADDRESS'; payload: Address }
