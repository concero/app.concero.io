import { SwapState } from '../../cards/SwapCard/swapReducer/types'
import { Fees } from '../../../types/StandardRoute'
import { TokenBalance } from '../../../api/concero/fetchBalancesByChainIds'

export function getInsufficientFeeChaiSymbols(swapState: SwapState): string | '' {
	const { walletBalances, selectedRoute } = swapState
	let insufficientGasChainSymbols: string | '' = ''

	selectedRoute?.cost.total_fee.forEach((fee: Fees) => {
		if (!walletBalances) return
		const tokenBalance = walletBalances[fee.asset.chainId]?.find((balance: TokenBalance) => {
			return balance.address.toLowerCase() === fee.asset.address?.toLowerCase()
		})
		if (!tokenBalance || (tokenBalance && parseFloat(tokenBalance.amount) < parseFloat(fee.amount))) {
			insufficientGasChainSymbols = insufficientGasChainSymbols.concat(`${fee.asset.symbol} ${fee.asset.chainId} `)
		}
	})

	return insufficientGasChainSymbols
}
