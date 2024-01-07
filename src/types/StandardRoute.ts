export interface StandardRoute {
	id: string
	from: Direction
	to: Direction
	steps: Step[] | null
	cost: {
		total_usd: string | null | undefined
		total_gas_usd: string | null | undefined
		total_fee: Fees[] | []
	}
	tags: Array<'RECOMMENDED' | 'FASTEST' | 'CHEAPEST' | 'SAFEST'> | undefined
	slippage_percent: number | null
	transaction_time_seconds: number | null
	insurance: Insurance | null
	provider: 'rango' | 'lifi'
}

export interface Direction {
	token: {
		name: string
		address: string | null
		symbol: string
		decimals: number
		price_usd?: number | string | null
		amount: string | null
		amount_usd: string | null
	}
	chain: {
		id: number | string
		providers?: Providers[]
	}
	amount: string | null
	address: string | null
}

export interface Providers {
	name: string
	symbol: string
	_id: string
}

export interface Step {
	id: string
	from: {
		token: {
			name: string
			address: string | null
			symbol: string
			decimals: number
			price_usd: string | number | null
			amount: string
			amount_usd?: string | null
			logo_uri: string | null
		}
		chain: {
			id: string
		}
	}
	to: {
		token: {
			name: string
			address: string
			symbol: string
			decimals: number
			price_usd: string | null
			amount: string
			amount_usd?: string | null
			logo_uri: string | null
		}
		chain: {
			id: string
		}
	}
	tool: {
		name: string
		estimated_execution_time_seconds: number
		slippage_limit: number | null
		fees: Fees[] | []
		fees_usd: number | null
		gas: Gas[] | []
		gas_usd: number | string | null
		logo_uri: string
	}
}

interface Insurance {
	state: string
	fee_amount_usd: string
}

export interface Fees {
	amount: string
	type?: string
	asset: {
		chainId: string
		symbol: string
		decimals?: number
		address?: string | null
	}
}

export interface Gas {
	amount: string
	type?: string
	asset: {
		chainId: string
		symbol: string
		decimals?: number
		address: string | null
	}
}
