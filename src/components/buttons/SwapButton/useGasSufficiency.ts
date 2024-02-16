import { type SwapState } from '../../cards/SwapCard/swapReducer/types'
import { useContext, useEffect, useState } from 'react'
import { type Fees, type StandardRoute, type Step } from '../../../types/StandardRoute'
import { TokenAmount } from '../../../utils/TokenAmount'
import { config } from '../../../constants/config'
import BigNumber from 'bignumber.js'
import { type Chain, type TokenBalance } from '../../../api/concero/types'
import { type GetChainsParams, type GetTokensParams } from '../../../hooks/DataContext/types'
import { roundNumberByDecimals } from '../../../utils/formatting'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { fetchTokenBalances } from '../../../api/concero/fetchTokenBalances'

export interface GasSufficiency {
	isInsufficient: boolean
	insufficientAmount?: string
	token?: Token
	chain?: Chain
}

async function getGasSufficiency(
	swapState: SwapState,
	getTokens: (param: GetTokensParams) => Promise<Token[]>,
	getChains: (param: GetChainsParams) => Promise<Chain[]>,
	walletBalances: TokenBalance | null,
): Promise<GasSufficiency> {
	if (!walletBalances) return { isInsufficient: false }
	const { selectedRoute } = swapState

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

		const nativeChain: Chain = (await getChains({ offset: 0, limit: 20 })).find((chain: Chain) => {
			return chain.id === steps[0].from.chain.id
		})

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

async function getBalances(selectedRoute: StandardRoute, walletAddress: string): Promise<TokenBalance | null> {
	const dotSeparatedAddresses: Array<`${string}.${string}`> = []
	const tokensSet = new Set<`${string}.${string}`>()

	selectedRoute.steps?.forEach((steps: Step[]) => {
		steps.forEach((step: Step) => {
			step.tool.gas.forEach((gas: Fees) => {
				const str: `${string}.${string}` = `${gas.asset.chainId}.${gas.asset.address?.toLowerCase()}`
				if (!tokensSet.has(str)) {
					tokensSet.add(str)
					dotSeparatedAddresses.push(str)
				}
			})
		})
	})

	return await fetchTokenBalances(dotSeparatedAddresses, walletAddress)
}

export function useGasSufficiency(swapState: SwapState) {
	const [gasSufficiency, setGasSufficiency] = useState<GasSufficiency | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { getTokens, getChains } = useContext(DataContext)

	const handleGetGasSufficiency = async () => {
		if (!swapState.selectedRoute || swapState.isLoading) return
		setIsLoading(true)
		const balances = await getBalances(swapState.selectedRoute, swapState.from.address)
		setGasSufficiency(await getGasSufficiency(swapState, getTokens, getChains, balances))
		setIsLoading(false)
	}

	useEffect(() => {
		void handleGetGasSufficiency()
	}, [swapState.selectedRoute?.id])

	return { gasSufficiency, isLoading }
}
