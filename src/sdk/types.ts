import { extend } from 'dayjs'
import { type Address } from 'viem'

export interface Token {
	_id: string
	address: Address
	chainId: string
	decimals: number
	name: string
	symbol: string
	price: string
	totalValueLocked: string
	totalValueLockedUsd: string
	volume: string
	volumeUsd: string
}

export interface Provider {
	_id: string
	name: string
	symbol: string
}

export interface Chain {
	_id: string
	id: string
	__v: number
	addressPatterns: string[]
	explorerURI: string
	name: string
	providers: Provider[]
	symbol: string
	tokens: string
}

export interface SwapDirectionData {
	token: Token
	chain: Chain
	amount: string
	amount_usd: string
}

export interface SwapStepDirectionData extends Omit<SwapDirectionData, 'chain'> {
	chainId: string
}

export interface Fee {
	amount: string
	amount_usd: string
	type: string
	token: Token
}

type SwapType = 'bridge' | 'swap'

export interface Step {
	from: SwapStepDirectionData
	to: SwapStepDirectionData
	tool: {
		type: SwapType
		name: string
		logo_url: string
		execution_time_seconds: string
		address: Address
		fees: Fee[]
	}
}

export interface Gas {
	amount: string
	amount_usd: string
	type: string
	token: Token
}

export interface RouteData {
	_id: string
	from: SwapDirectionData
	to: SwapDirectionData
	gas: Gas
	fees: Fee[]
	steps: Step[]
}

export interface Route {
	success: boolean
	data: RouteData
}

export interface RouteRequest {
	fromChainId: string
	fromAmount: string
	fromTokenAddress: Address
	fromAddress?: Address
	toChainId: string
	toTokenAddress: Address
	toAddress?: Address
}
