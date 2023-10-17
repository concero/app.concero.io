import { Dispatch } from 'react'
import { ManageAction, ManageState } from '../useManageReducer/types'
import { Status } from '../constants'
import { getSigner } from '../../../../../web3/getSigner'
import { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core'
import BigNumber from 'bignumber.js'
import { addingAmountDecimals } from '../../../../../utils/formatting'
import { fetchApprovalTx } from '../../../../../api/enso/approvalTx'
import { retryRequest } from '../../../../../utils/retryRequest'
import { fetchEnsoRoute } from '../../../../../api/enso/fetchEnsoQuote'
import { approveToken, checkIsApproveNeeded, handleError } from './helpers'

type SwitchChainNetwork = (chainId_?: SwitchNetworkArgs['chainId']) => Promise<SwitchNetworkResult>

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<ManageAction>, switchNetworkAsync: SwitchChainNetwork): Promise<void> {
	manageDispatch({ type: 'SET_LOADING', payload: true })
	manageDispatch({ type: 'SET_STATUS', payload: Status.loading })

	if (!manageState.route) return
	const { from, address, to } = manageState

	try {
		const signer = await getSigner(Number(from.chain.id), switchNetworkAsync)
		const approvalTx = await fetchApprovalTx(from.chain.id, address, from.token.address, addingAmountDecimals(from.amount, from.token.decimals) as string)

		const isApproveNeeded = await checkIsApproveNeeded(from.chain.id, address, from.token.address, addingAmountDecimals(from.amount, from.token.decimals) as string)

		if (isApproveNeeded) {
			await approveToken({ signer, tokenAddress: from.token.address, receiverAddress: approvalTx.spender, fromAmount: approvalTx.amount })
		}

		const route = await retryRequest(
			async () =>
				await fetchEnsoRoute({
					chainId: from.chain.id,
					fromAddress: address,
					amountIn: addingAmountDecimals(from.amount, from.token.decimals) as string,
					tokenIn: from.token.address,
					tokenOut: to.token.address,
				}),
			{ retryCount: 3 },
		)

		const transactionArgs = {
			...route.tx,
			gasLimit: BigNumber(manageState.route.gas).times(1.8).toFixed(0).toString(),
		}

		console.log('transactionArgs', transactionArgs)
		await signer.sendTransaction(transactionArgs)
		manageDispatch({ type: 'SET_STATUS', payload: Status.success })
	} catch (error) {
		console.log(error)
		handleError(error as Error, manageDispatch)
	} finally {
		manageDispatch({ type: 'SET_LOADING', payload: false })
	}
}
