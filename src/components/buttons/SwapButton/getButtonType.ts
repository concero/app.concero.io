import { SwapState } from '../../cards/SwapCard/swapReducer/types'
import { ButtonType } from './constants'
import { isInsufficientFee } from './isInsufficientFee'
import { Fees } from '../../../types/StandardRoute'
import { config } from '../../../constants/config'

export function getButtonType(swapState: SwapState, isConnected: boolean): ButtonType {
	const { from, to, routes, isLoading, balance, isNoRoutes, selectedRoute } = swapState

	if (isLoading) {
		return ButtonType.LOADING
	}

	if (isNoRoutes) {
		return ButtonType.NO_ROUTES
	}

	if (!isConnected) {
		return ButtonType.CONNECT_WALLET
	}

	if (!from.amount || (from.amount && !routes.length)) {
		return ButtonType.ENTER_AMOUNT
	}

	let fromGasAmount: string | 0 = 0

	if (selectedRoute?.from.token.address === config.NULL_ADDRESS) {
		fromGasAmount =
			selectedRoute.cost.total_fee.find((fee: Fees) => fee.asset.chainId === from.chain.id && fee.asset.address?.toLowerCase() === from.token.address.toLowerCase())?.amount ?? 0
	}

	const fullAmount = Number(from.amount) + Number(fromGasAmount)
	const balanceNumber = Number(balance.split(' ')[0] ?? 0)

	if (balance && fullAmount > balanceNumber) {
		return ButtonType.LOW_BALANCE
	}

	const isInsufficient = isInsufficientFee(swapState)

	if (isInsufficient) {
		return ButtonType.LOW_FEES
	}

	if (from.amount && to.amount && routes.length) {
		return ButtonType.SWAP
	}

	return ButtonType.ENTER_AMOUNT
}
