import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { type Fees, type Step } from '../../../types/StandardRoute'
import { TokenAmount } from '../../../utils/TokenAmount'
import { config } from '../../../constants/config'
import BigNumber from 'bignumber.js'
import { type Chain } from '../../../api/concero/types'
import { type GetChainsParams, type GetTokensParams } from '../../../hooks/DataContext/types'

export interface GasSufficiency {
	isInsufficient: boolean
	insufficientAmount?: TokenAmount | null
	token?: Token
	chain?: Chain
}

export async function getGasSufficiency(
	swapState: SwapState,
	getTokens: (param: GetTokensParams) => Promise<Token[]>,
	getChains: (param: GetChainsParams) => Promise<Chain[]>,
): Promise<GasSufficiency> {
	const { selectedRoute, walletBalances } = swapState

	let result: GasSufficiency = {
		isInsufficient: false,
	}

	for (const steps of selectedRoute?.steps) {
		if (result.isInsufficient) return

		const isNativeToken = steps[0].from.token.address === config.NULL_ADDRESS
		const amountToCheck = new BigNumber(0) // gas and non-included fees in native token
		const nativeToken = await getTokens({
			chainId: steps[0].from.chain.id as string,
			search: config.NULL_ADDRESS,
			offset: 0,
			limit: 1,
		})

		steps.forEach((step: Step) => {
			step.tool.fees.forEach((fee: Fees) => {
				if (fee.asset.address?.toLowerCase() !== config.NULL_ADDRESS) {
					return
				}
				amountToCheck.plus(fee.amount)
			})

			step.tool.gas.forEach((gas: Fees) => {
				if (gas.asset.address?.toLowerCase() !== config.NULL_ADDRESS) {
					return
				}
				amountToCheck.plus(gas.amount)
			})
		})

		const tokenBalanceObj =
			walletBalances?.[steps[0].from.chain.id]?.find((balance: Token) => {
				return balance.address.toLowerCase() === config.NULL_ADDRESS
			}) ?? null

		if (!tokenBalanceObj && amountToCheck.gt(0)) {
			const nativeTokenDecimals = nativeToken ? nativeToken.asset.decimals! : 18
			result = {
				isInsufficient: true,
				insufficientAmount: new TokenAmount(amountToCheck.toString(), nativeTokenDecimals),
				token: {
					address: config.NULL_ADDRESS,
					chainId: steps[0].from.chain.id,
					decimals: nativeTokenDecimals,
					name: nativeToken?.asset.symbol!,
					symbol: nativeToken?.asset.symbol!,
				},
				chain: { id: nativeToken?.asset.chainId! },
			}
			return
		}

		const tokenBalanceAmount = new BigNumber(new TokenAmount(tokenBalanceObj.balance, tokenBalanceObj.decimals).formatted)

		const insufficientAmount = isNativeToken
			? amountToCheck.minus(tokenBalanceAmount.minus(steps[0].from.token.amount))
			: amountToCheck.minus(tokenBalanceAmount)

		console.log(amountToCheck.toString(), tokenBalanceAmount.toString(), steps[0].from.token.amount)

		if (insufficientAmount.gt(0)) {
			result = {
				isInsufficient: true,
				insufficientAmount: new TokenAmount(insufficientAmount.toString(), nativeTokenDecimals ?? 18),
				token: steps[0].from.token,
				chain: steps[0].from.chain,
			}
		}
	}

	return result
}
