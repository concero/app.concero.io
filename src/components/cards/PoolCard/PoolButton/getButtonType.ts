import { ButtonType } from './constants'
import BigNumber from 'bignumber.js'
import { type SwapState } from '../swapReducer/types'

export function getButtonType(
	swapState: SwapState,
	isConnected: boolean,
	isInsufficientGas: boolean,
	isFetchBalancesLoading: boolean,
): ButtonType {
	const { from, to, routes, isLoading, balance, isNoRoutes, selectedRoute, isWithdrawInitiated, poolMode, stage } =
		swapState

	if (poolMode === 'withdraw' && isWithdrawInitiated) {
		return ButtonType.WITHDRAW_NOT_AVAILABLE
	}

	if (isLoading) {
		return ButtonType.LOADING
	}

	if (isNoRoutes) {
		return ButtonType.NO_ROUTES
	}

	if (!isConnected) {
		return ButtonType.CONNECT_WALLET_BRIGHT
	}

	if (balance && new BigNumber(from.amount).gt(balance.amount.formatted)) {
		// return ButtonType.LOW_BALANCE
	}

	if (from.amount) {
		if (swapState.poolMode === 'deposit') {
			if (BigNumber(from.amount).lt(100)) return ButtonType.TESTNET_AMOUNT_TOO_LOW

			return ButtonType.DEPOSIT
		} else {
			return ButtonType.WITHDRAW
		}
	}

	if (!from.amount || (from.amount && routes.length === 0)) {
		return ButtonType.ENTER_AMOUNT
	}

	if (selectedRoute && stage === 'input') {
		return ButtonType.REVIEW
	}

	if (isFetchBalancesLoading) {
		return ButtonType.FETCH_BALANCES_LOADING
	}

	if (isInsufficientGas) {
		return ButtonType.LOW_GAS
	}

	if (from.amount && to.amount && routes.length > 0) {
		return ButtonType.DEPOSIT
	}

	return ButtonType.ENTER_AMOUNT
}
