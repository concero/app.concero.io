export interface FetchEnsoQuoteParams {
	chainId: number
	fromAddress: string
	amountIn: string
	tokenIn: string
	tokenOut: string
}

export interface EnsoRoute {
	action: string
	primary: string
	protocol: string
	tokenIn: string
	tokenOut: string
	positionInId: string
	positionOutId: string
}

interface Transaction {
	data: string
	to: string
	from: string
	value: string
}

export interface EnsoRouteResponse {
	createdAt: number
	route: EnsoRoute[]
	priceImpact: number
	gas: number
	amountOut: string
	tx: Transaction
}
