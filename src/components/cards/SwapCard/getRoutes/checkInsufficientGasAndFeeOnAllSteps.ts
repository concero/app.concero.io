import { Fees, StandardRoute, Step } from '../../../../types/StandardRoute'
import { Dispatch } from 'react'
import { SwapAction, SwapActionType } from '../swapReducer/types'
import { fetchBalancesByChainIds, TokenBalance } from '../../../../api/concero/fetchBalancesByChainIds'
import { ButtonType } from '../../../buttons/SwapButton/constants'

export async function checkInsufficientGasAndFeeOnAllSteps(routes: StandardRoute[], swapDispatch: Dispatch<SwapAction>, walletAddress: string): Promise<void> {
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

	const walletBalances = await fetchBalancesByChainIds(chainIds, walletAddress as string)
	const insufficientGas: string[] = []

	routes.forEach((route: StandardRoute) => {
		route.steps?.forEach((step: Step) => {
			step.tool.fees.forEach((fee: Fees) => {
				const chainBalance = walletBalances[fee.asset.chainId]
				const tokenBalance = chainBalance?.find((balance: TokenBalance) => balance.address === fee.asset.address)
				if (!chainBalance || !tokenBalance || Number(tokenBalance.amount) < Number(fee.amount)) {
					if (!insufficientGas.includes(`${fee.asset.symbol} ${fee.asset.chainId}`)) {
						insufficientGas.push(`${fee.asset.symbol} ${fee.asset.chainId}`)
					}
				}
			})
		})
	})

	if (insufficientGas.length > 0) {
		swapDispatch({ type: SwapActionType.SET_BUTTON_STATE, buttonType: ButtonType.LOW_GAS, message: `Insufficient ${insufficientGas.join(', ')}` })
	}
}
