import { SwapState } from '../../cards/SwapCard/swapReducer/types'
import { Fees } from '../../../types/StandardRoute'
import { config } from '../../../constants/config'
import BigNumber from 'bignumber.js'
import { TokenBalance } from '../../../api/concero/fetchBalancesByChainIds'

export function checkIsInsufficientBalance(swapState: SwapState): boolean {
	const { balance, selectedRoute, from, walletBalances } = swapState

	if (!balance) return false

	const nativeFee = selectedRoute?.cost.total_fee.find((fee: Fees) => {
		if (fee.asset.chainId === from.chain.id && fee.asset.address?.toLowerCase() === from.token.address.toLowerCase()) return true
	})
	const balanceAmount = balance?.split(' ')[0] ?? 0

	if (selectedRoute?.from.token.address === config.NULL_ADDRESS) {
		const fullAmount = new BigNumber(from.amount).plus(nativeFee?.amount ?? 0)
		return fullAmount.isGreaterThan(balanceAmount)
	} else {
		if (!walletBalances) return false

		const nativeBalance = walletBalances[selectedRoute?.from.chain.id as string]?.find((balance: TokenBalance) => {
			if (balance.address === config.NULL_ADDRESS) return true
		})

		return (
			new BigNumber(nativeFee?.amount ?? 0).isGreaterThan(nativeBalance?.amount ?? 0) ||
			new BigNumber(from.amount).isGreaterThan(balanceAmount)
		)
	}
}
