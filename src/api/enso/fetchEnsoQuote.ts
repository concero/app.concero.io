import { config } from '../../constants/config'
import { get } from '../client'
import { type EnsoRouteResponse, type FetchEnsoQuoteParams } from './types'

export async function fetchEnsoRoute({ chainId, fromAddress, amountIn, tokenIn, tokenOut }: FetchEnsoQuoteParams): Promise<EnsoRouteResponse | void> {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${config.ENSO_API_KEY}`,
	}

	const tokenInAddress = tokenIn === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenIn
	const tokenOutAddress = tokenOut === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenOut

	const url = `https://api.enso.finance/api/v1/shortcuts/route?chainId=${chainId}&receiver=${fromAddress}&fromAddress=${fromAddress}&spender=${fromAddress}&amountIn=${amountIn}&tokenIn=${tokenInAddress}&tokenOut=${tokenOutAddress}`
	try {
		const response = await get(url, { headers })
		return response.data
	} catch (error) {
		console.error('Error fetching Enso route:', error)
	}
}

export async function fetchEnsoQuote({ chainId, fromAddress, amountIn, tokenIn, tokenOut }: FetchEnsoQuoteParams): Promise<EnsoRouteResponse | void> {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${config.ENSO_API_KEY}`,
	}
	const tokenInAddress = tokenIn === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenIn
	const tokenOutAddress = tokenOut === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : tokenOut
	const url = `https://api.enso.finance/api/v1/shortcuts/quote`

	const params = {
		chainId,
		fromAddress,
		amountIn,
		tokenIn: tokenInAddress,
		tokenOut: tokenOutAddress,
	}
	try {
		const response = await get(url, params, headers)

		return response.data
	} catch (error) {
		console.error('Error fetching Enso route:', error)
	}
}
