import { config } from '../../constants/config'
import { get } from '../client'
import { EnsoRouteResponse, FetchEnsoQuoteParams } from './types'

export async function fetchEnsoQuote({ chainId, fromAddress, amountIn, tokenIn, tokenOut }: FetchEnsoQuoteParams): Promise<EnsoRouteResponse | void> {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${config.ENSO_API_KEY}`,
	}

	const url = `https://api.enso.finance/api/v1/shortcuts/route?chainId=${chainId}&fromAddress=${fromAddress}&toEoa=true&amountIn=${amountIn}&tokenIn=${
		tokenIn === config.NULL_ADDRESS ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : tokenIn
	}&tokenOut=${tokenOut === config.NULL_ADDRESS ? '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' : tokenOut}`

	console.log(url)

	try {
		const response = await get(url, { headers })
		console.log('response', response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching Enso route:', error)
	}
}
