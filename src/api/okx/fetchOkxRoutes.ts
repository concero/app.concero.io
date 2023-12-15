import { StandardRoute } from '../../types/StandardRoute'
import { Settings, SwapStateDirection } from '../../components/cards/SwapCard/swapReducer/types'
import { config } from '../../constants/config'
import { get } from '../client'

export async function fetchOkxRoutes(from: SwapStateDirection, to: SwapStateDirection, settings: Settings): Promise<[StandardRoute[]] | []> {
	try {
		const fromTokenAddress = from.token.address.toLowerCase() === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : from.token.address
		const toTokenAddress = to.token.address.toLowerCase() === config.NULL_ADDRESS ? config.NULL_E_ADDRESS : to.token.address
		const url = `${config.baseURL}/okxRoutes?fromChainId=${from.chain.id}&fromTokenAddress=${fromTokenAddress}&toChainId=${to.chain.id}&toTokenAddress=${toTokenAddress}&amount=${from.amount}&slippage=${settings.slippage_percent}`
		const response = await get(url)
		return response.data.data
	} catch (error) {
		console.error(error)
		return []
	}
}
