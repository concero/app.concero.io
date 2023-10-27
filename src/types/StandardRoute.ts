export interface StandardRoute {
	id: string
	from: Direction
	to: Direction
	steps: Step[] | null
	cost: {
		total_usd: string | null | undefined
		total_gas_usd: string | null | undefined
	}
	tags: ('RECOMMENDED' | 'FASTEST' | 'CHEAPEST' | 'SAFEST')[] | undefined
	slippage_percent: number | null
	transaction_time_seconds: number | null
	insurance: Insurance | null
}

export type Direction = {
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

export type Step = {
	id: string
	from: {
		token: {
			name: string
			address: string | null
			symbol: string
			decimals: number
			price_usd: string | number | null
			amount: string
			logo_uri: string
		}
		chain: {
			id: number
		}
	}
	to: {
		token: {
			name: string
			address: string
			symbol: string
			decimals: number
			price_usd: string
			amount: string
			logo_uri: string | undefined
		}
		chain: {
			id: number
		}
	}
	tool: {
		name: string
		estimated_execution_time_seconds: number
		slippage_limit: number
		fees: number
		fees_usd: number
		gas: number
		gas_usd: number
		logo_uri: string
	}
}

interface Insurance {
	state: string
	fee_amount_usd: string
}
