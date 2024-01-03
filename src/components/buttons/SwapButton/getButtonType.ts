import { SwapState } from '../../cards/SwapCard/swapReducer/types'
import { ButtonType } from './constants'
import { checkIsInsufficientBalance } from './checkIsInsufficientBalance'

export function getButtonType(swapState: SwapState, isConnected: boolean): ButtonType {
	const { from, to, routes, isLoading, isNoRoutes } = swapState

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

	const isInsufficientBalance = checkIsInsufficientBalance(swapState)

	if (isInsufficientBalance) {
		return ButtonType.LOW_BALANCE
	}

	if (from.amount && to.amount && routes.length) {
		return ButtonType.SWAP
	}

	return ButtonType.ENTER_AMOUNT
}
