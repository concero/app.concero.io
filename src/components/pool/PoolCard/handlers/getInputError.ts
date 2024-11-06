import { type SwapState } from '../swapReducer/types'
import { ErrorType } from '../SwapButton/constants'
import BigNumber from 'bignumber.js'
import { IS_TESTNET } from '../../../../constants/config'

const minAmount = IS_TESTNET ? 0 : 100

export function getInputError(swapState: SwapState): ErrorType | null {
	const { from, balance, poolMode } = swapState

	const isDeposit = poolMode === 'deposit'

	if (from.amount === '') return null

	if (isDeposit && Number(from.amount) < minAmount) {
		return ErrorType.AMOUNT_TOO_LOW
	}

	if (balance && new BigNumber(from.amount).gt(balance.amount.formatted)) {
		return ErrorType.LOW_BALANCE
	}

	return null
}
