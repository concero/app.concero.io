import { type SwapState } from '../swapReducer/types'
import { ErrorType } from './constants'
import BigNumber from 'bignumber.js'

export function getInputError(swapState: SwapState, isInsufficientGas?: boolean): ErrorType | null {
	const { from, balance, isSufficientLiquidity } = swapState

	if (from.amount) {
		if (!isSufficientLiquidity) return ErrorType.NOT_SUFFICIENT_LIQUIDITY
	}

	if (balance && new BigNumber(from.amount).gt(balance.amount.formatted)) {
		return ErrorType.LOW_BALANCE
	}

	if (isInsufficientGas) {
		return ErrorType.LOW_GAS
	}

	return null
}
