import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { type Fees, type Step } from '../../../types/StandardRoute'
import { TokenAmount } from '../../../utils/TokenAmount'
import { config } from '../../../constants/config'
import BigNumber from 'bignumber.js'
import { type Chain } from '../../../api/concero/types'
import { type GetChainsParams, type GetTokensParams } from '../../../hooks/DataContext/types'
import { roundNumberByDecimals } from '../../../utils/formatting'

export interface GasSufficiency {
	isInsufficient: boolean
	insufficientAmount?: string
	token?: Token
	chain?: Chain
}

export async function getGasSufficiency(
	swapState: SwapState,
	getTokens: (param: GetTokensParams) => Promise<Token[]>,
	getChains: (param: GetChainsParams) => Promise<Chain[]>,
): Promise<GasSufficiency> {
	const { selectedRoute, walletBalances } = swapState

	for (const steps of selectedRoute?.steps ?? []) {
		const isNativeToken = steps[0].from.token.address === config.NULL_ADDRESS
		let amountToCheck = new BigNumber(0) // gas and non-included fees in native token
		const nativeToken: Token = (
			await getTokens({
				chainId: steps[0].from.chain.id as string,
				search: config.NULL_ADDRESS,
				offset: 0,
				limit: 1,
			})
		).find((token: Token) => token.address.toLowerCase() === config.NULL_ADDRESS)
		const nativeChain: Chain = (
			await getChains({ chainId: steps[0].from.chain.id as string, search: '', offset: 0, limit: 1 })
		)[0]

		steps.forEach((step: Step) => {
			step.tool.fees.forEach((fee: Fees) => {
				if (fee.asset.address?.toLowerCase() === config.NULL_ADDRESS) {
					amountToCheck = amountToCheck.plus(fee.amount)
				}
			})

			step.tool.gas.forEach((gas: Fees) => {
				if (gas.asset.address?.toLowerCase() === config.NULL_ADDRESS) {
					amountToCheck = amountToCheck.plus(new BigNumber(gas.amount))
				}
			})
		})

		const tokenBalanceObj =
			walletBalances?.[steps[0].from.chain.id]?.find((balance: Token) => {
				return balance.address.toLowerCase() === config.NULL_ADDRESS
			}) ?? null

		if (!tokenBalanceObj && amountToCheck.gt(0)) {
			return {
				isInsufficient: true,
				insufficientAmount: roundNumberByDecimals(amountToCheck.toString(), 4)!,
				token: nativeToken,
				chain: nativeChain,
			}
		}

		const tokenBalanceAmount = new BigNumber(new TokenAmount(tokenBalanceObj.balance, tokenBalanceObj.decimals).formatted)

		const insufficientAmount = isNativeToken
			? amountToCheck.minus(tokenBalanceAmount.minus(steps[0].from.token.amount!))
			: amountToCheck.minus(tokenBalanceAmount)

		if (insufficientAmount.gt(0)) {
			return {
				isInsufficient: true,
				insufficientAmount: roundNumberByDecimals(insufficientAmount.toString(), 4)!,
				token: nativeToken,
				chain: nativeChain,
			}
		}
	}

	return { isInsufficient: false }
}
