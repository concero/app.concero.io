import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { type Chain, type Fees, type Step, type Token } from '../../../types/StandardRoute'
import { TokenAmount } from '../../../utils/TokenAmount'

export interface FeeSufficiency {
	isInsufficient: boolean
	insufficientAmount: TokenAmount | null
	token: Token
	chain: Chain
}

export function checkFeeSufficiency(swapState: SwapState): FeeSufficiency {
	const { selectedRoute, walletBalances } = swapState

	selectedRoute?.steps?.forEach((step: Step) => {
		step.tool.fees.forEach((fee: Fees) => {
			const feeAmount = new TokenAmount(fee.amount, fee.asset.decimals!)
			const amountToCompare = Number(walletBalances[step.from.chain.id]) - Number(step.from.token.amount)
		})
	})
}
