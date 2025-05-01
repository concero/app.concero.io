import { type Execution } from '@lifi/types/dist/step'
import type * as lifiTypes from '@lifi/sdk/dist/types'
import type { BestRouteResponse } from 'rango-types/src/api/main/routing'


export enum FeeTypes {
	gas = 'gas',
	fee = 'fee',
}

export interface Fees {
	amount: string
	type?: FeeTypes
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

export interface Direction {
	token: {
		name: string
		address: string | null
		symbol: string
		decimals: number
		price_usd?: number | string | null
		logo_uri?: string | null
		amount: string | null
		amount_usd: string | null | undefined
	}
	chain: {
		id: number | string
		logo_uri: string
		providers?: Providers[]
	}
	amount?: string | null
	amount_usd: string | null | undefined
	address: string | undefined | null
}

export enum StepTypes {
	swap = 'swap',
	bridge = 'bridge',
	protocol = 'protocol',
	custom = 'custom',
}

export interface Step {
	id: string
	type: StepTypes
	from: Direction
	to: Direction
	tool: {
		name: string
		estimated_execution_time_seconds: number
		slippage_limit: number | null
		fees: Fees[] | []
		fees_usd: number | null
		gas: Fees[] | []
		gas_usd: number | string | null
		logo_uri: string
	}
}

export interface StandardRoute {
	id: string
	from: Direction
	to: Direction
	steps: Step[][] | null
	cost: {
		total_usd: string | null | undefined
		total_gas_usd: string | null | undefined
		total_fee: Fees[] | []
		total_fee_usd?: string
	}
	tags: Array<'RECOMMENDED' | 'FASTEST' | 'CHEAPEST' | 'SAFEST'> | undefined
	slippage_percent: number | null
	transaction_time_seconds: number | null
	insurance?: Insurance | null
	provider: 'rango' | 'lifi'
	execution?: Array<Execution | undefined>
	originalRoute: lifiTypes.Route | BestRouteResponse
}
