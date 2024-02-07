import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { type Chain, type Fees, type Step, type Token } from '../../../types/StandardRoute'
import { TokenAmount } from '../../../utils/TokenAmount'
import { config } from '../../../constants/config'
import BigNumber from 'bignumber.js'
import { type TokenBalance } from '../../../api/concero/fetchBalancesByChainIds'

export interface GasSufficiency {
	isInsufficient: boolean
	insufficientAmount?: TokenAmount | null
	token?: Token
	chain?: Chain
}

export function getGasSufficiency(swapState: SwapState): GasSufficiency {
	const { selectedRoute, walletBalances } = swapState

	selectedRoute?.steps?.forEach((steps: Step[]) => {
		const isNativeToken = steps[0].from.token.address === config.NULL_ADDRESS
		const amountToCheck = new BigNumber(0) // gas and non-included fees in native token

		steps.forEach((step: Step) => {
			step.tool.fees.forEach((fee: Fees) => {
				amountToCheck.plus(fee.amount)
			})

			step.tool.gas.forEach((gas: Fees) => {
				amountToCheck.plus(gas.amount)
			})
		})

		const tokenBalanceObj =
			walletBalances?.[steps[0].from.chain.id].find((balance: TokenBalance) => {
				return balance.address === steps[0].from.token.address
			}) ?? null

		if (!tokenBalanceObj) {
			return {
				isInsufficient: true,
				insufficientAmount: new TokenAmount(amountToCheck.toString(), steps[0].from.token.decimals),
				token: steps[0].from.token,
				chain: steps[0].from.chain,
			}
		}

		const tokenBalanceAmount = new BigNumber(new TokenAmount(tokenBalanceObj.amount, tokenBalanceObj.decimals).formatted)

		const insufficientAmount = isNativeToken
			? amountToCheck.minus(tokenBalanceAmount.minus(steps[0].from.token.amount!))
			: amountToCheck.minus(tokenBalanceAmount)

		if (insufficientAmount.gt(0)) {
			return {
				isInsufficient: true,
				insufficientAmount: new TokenAmount(insufficientAmount.toString(), steps[0].from.token.decimals),
				token: steps[0].from.token,
				chain: steps[0].from.chain,
			}
		}
	})

	return {
		isInsufficient: false,
	}
}
