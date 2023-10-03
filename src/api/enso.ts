import { config } from '../constants/config'
import { get } from './client'
import { FetchEnsoQuoteParams } from '../components/cards/StakingHeaderCard/ManageModal/getQuote'

interface FetchEnsoQuoteParams {
	chainId: number
	fromAddress: string
	toEoa?: boolean
	amountIn: string
	tokenIn: string
	tokenOut: string
}

export async function fetchEnsoQuote({ chainId, fromAddress, toEoa = false, amountIn, tokenIn, tokenOut }: FetchEnsoQuoteParams) {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${config.ENSO_API_KEY}`,
	}
	const url = `https://api.enso.finance/api/v1/shortcuts/route?chainId=${chainId}&fromAddress=${fromAddress}&toEoa=${toEoa}&amountIn=${amountIn}&tokenIn=${tokenIn}&tokenOut=${tokenOut}`

	console.log('chainId', chainId)
	console.log('fromAddress', fromAddress)
	console.log('toEoa', toEoa)
	console.log('amountIn', amountIn)
	console.log('tokenIn', tokenIn)
	console.log('tokenOut', tokenOut)

	try {
		const response = await get(url, { headers })
		console.log('response', response.data)
		return response.data
	} catch (error) {
		console.error('Error fetching Enso route:', error)
	}
}
