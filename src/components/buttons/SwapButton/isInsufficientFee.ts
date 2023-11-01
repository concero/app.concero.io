import { SwapState } from '../../cards/SwapCard/swapReducer/types'
import { Fees } from '../../../types/StandardRoute'
import { TokenBalance } from '../../../api/concero/fetchBalancesByChainIds'

export function isInsufficientFee(swapState: SwapState): boolean {
	const { walletBalances, selectedRoute } = swapState
	let isInsufficient = false

	selectedRoute?.cost.total_fee.forEach((fee: Fees) => {
		if (!walletBalances) {
			isInsufficient = true
			return
		}
		const tokenBalance = walletBalances[fee.asset.chainId]?.find((balance: TokenBalance) => {
			return balance.address.toLowerCase() === fee.asset.address?.toLowerCase()
		})
		if (!tokenBalance || (tokenBalance && parseFloat(tokenBalance.amount) < parseFloat(fee.amount))) {
			isInsufficient = true
		}
	})

	return isInsufficient
}
