import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { type Fees } from '../../../types/StandardRoute'
import { type TokenBalance } from '../../../api/concero/fetchBalancesByChainIds'
import { trackEvent } from '../../../hooks/useTracking'
import { action, category } from '../../../constants/tracking'
import { addingTokenDecimals } from '../../../utils/formatting'

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
		if (!tokenBalance || (tokenBalance && parseFloat(addingTokenDecimals(tokenBalance.amount, tokenBalance.decimals)!) < parseFloat(fee.amount))) {
			isInsufficient = true
		}
	})
	if (isInsufficient) trackEvent({ category: category.SwapCard, action: action.InsufficientGas, label: 'insufficient_gas' })
	return isInsufficient
}
