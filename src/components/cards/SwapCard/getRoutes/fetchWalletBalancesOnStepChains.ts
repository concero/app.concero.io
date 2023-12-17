import { Fees, StandardRoute, Step } from '../../../../types/StandardRoute'
import { Dispatch } from 'react'
import { SwapAction, SwapActionType } from '../swapReducer/types'
import { fetchBalancesByChainIds } from '../../../../api/concero/fetchBalancesByChainIds'

export async function fetchWalletBalancesOnStepChains(routes: StandardRoute[], swapDispatch: Dispatch<SwapAction>, walletAddress: string): Promise<void> {
	if (!routes.length) return

	let chainIds: string[] = []

	routes.forEach((route: StandardRoute) => {
		route.steps?.forEach((step: Step) => {
			step.tool.fees.forEach((fee: Fees) => {
				if (fee.asset.chainId && !chainIds.includes(fee.asset.chainId)) {
					chainIds.push(fee.asset.chainId)
				}
			})
		})
	})

	if (!chainIds.length) return

	const walletBalances = await fetchBalancesByChainIds(chainIds, walletAddress as string)
	swapDispatch({ type: SwapActionType.SET_WALLET_BALANCES, balances: walletBalances })
}
