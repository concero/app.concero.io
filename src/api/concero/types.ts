export interface Provider {
	name: string
	symbol: string
	_id: string
}

export interface Token {
	_id: string
	address: string
	chain_id: string
	decimals: number
	is_popular: boolean
	logoURI: string
	name: string
	providers: Provider[]
	symbol: string
	coinGeckoId: string
	priceUsd: number | null
	balance?: string
}

export interface Chain {
	_id: string
	id: string
	addressPatterns: string[]
	explorerURI: string
	logoURI: string
	name: string
	providers: Provider[]
	symbol: string
}

export interface Fee {
	poolLiquidity: number
	loanGivenOut: number
	feeMade: number
	percentReturned: number
	timestamp: number
	chainId: number
	blockNumber: number
}

export type TokenBalance = Record<string, Token[]>

export enum TransactionStatus {
	SUCCESS = 'SUCCESS',
	FAILED = 'FAILED',
	PENDING = 'PENDING',
	IDLE = 'IDLE',
}
