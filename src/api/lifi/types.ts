export interface FetchRoutesParams {
	from: {
		chain: {
			id: number
		}
		token: {
			name: string
			address: string
			symbol: string
		}
		address: string
		amount: string
	}
	to: {
		chain: {
			id: number
		}
		token: {
			name: string
			address: string
			symbol: string
		}
		address: string
	}
	settings: {
		slippage_percent: number
	}
}
