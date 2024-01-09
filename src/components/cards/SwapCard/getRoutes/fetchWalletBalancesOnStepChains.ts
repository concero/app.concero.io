import { type Fees, type StandardRoute, type Step } from '../../../../types/StandardRoute'
import { type Dispatch } from 'react'
import { type SwapAction, SwapActionType } from '../swapReducer/types'
import { fetchBalancesByChainIds } from '../../../../api/concero/fetchBalancesByChainIds'

export async function fetchWalletBalancesOnStepChains(routes: StandardRoute[], swapDispatch: Dispatch<SwapAction>, walletAddress: string): Promise<void> {
	if (routes.length === 0) return

	const chainIds: string[] = []

	routes.forEach((route: StandardRoute) => {
		route.steps?.forEach((step: Step) => {
			step.tool.fees.forEach((fee: Fees) => {
				if (fee.asset.chainId && !chainIds.includes(fee.asset.chainId)) {
					chainIds.push(fee.asset.chainId)
				}
			})
		})
	})

	if (chainIds.length === 0) return

	const walletBalances = await fetchBalancesByChainIds(chainIds, walletAddress)
	swapDispatch({ type: SwapActionType.SET_WALLET_BALANCES, balances: walletBalances })
}
