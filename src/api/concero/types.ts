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
}

export interface Chain {
	_id: string
	id: string
	addressPatterns: string[]
	logoURI: string
	name: string
	providers: Provider[]
	symbol: string
}
