import { StandardRoute } from '../../types/StandardRoute'
import { Settings, SwapStateDirection } from '../../components/cards/SwapCard/swapReducer/types'
import { config } from '../../constants/config'
import { get } from '../client'

export async function fetchOkxRoutes(from: SwapStateDirection, to: SwapStateDirection, settings: Settings): Promise<[StandardRoute[]] | []> {
	try {
		const url = `${config.baseURL}/okxRoutes?fromChainId=${from.chain.id}&fromTokenAddress=${from.token.address}&toChainId=${to.chain.id}&toTokenAddress=${to.token.address}&amount=${from.amount}&slippage=${settings.slippage_percent}`
		const response = await get(url)
		return response.data.data
	} catch (error) {
		console.error(error)
		return []
	}
}
