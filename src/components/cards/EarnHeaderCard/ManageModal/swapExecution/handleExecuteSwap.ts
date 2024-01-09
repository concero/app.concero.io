import { type Dispatch } from 'react'
import { type ManageAction, type ManageState } from '../useEarnReducer/types'
import { ModalType, Status } from '../constants'
import { getSigner } from '../../../../../web3/getSigner'
import { type SwitchNetworkArgs, type SwitchNetworkResult } from '@wagmi/core'
import BigNumber from 'bignumber.js'
import { addingAmountDecimals } from '../../../../../utils/formatting'
import { fetchApprovalTx } from '../../../../../api/enso/approvalTx'
import { retryRequest } from '../../../../../utils/retryRequest'
import { fetchEnsoRoute } from '../../../../../api/enso/fetchEnsoQuote'
import { approveToken, checkIsApproveNeeded, handleError } from './helpers'

type SwitchChainNetwork = (chainId_?: SwitchNetworkArgs['chainId']) => Promise<SwitchNetworkResult>

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<ManageAction>, switchNetworkAsync: SwitchChainNetwork): Promise<void> {
	manageDispatch({ type: 'SET_LOADING', payload: true })
	manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.progress })
	manageDispatch({ type: 'PUSH_STEP', step: { title: 'Fetching transaction data', status: 'pending' } })

	if (!manageState.route) return
	const { from, address, to } = manageState

	try {
		const signer = await getSigner(Number(from.chain.id), switchNetworkAsync)
		const approvalTx = await fetchApprovalTx(from.chain.id, address, from.token.address, addingAmountDecimals(from.amount, from.token.decimals)!)
		const isApproveNeeded = await checkIsApproveNeeded(from.chain.id, address, from.token.address, addingAmountDecimals(from.amount, from.token.decimals)!)

		if (isApproveNeeded) {
			manageDispatch({ type: 'PUSH_STEP', step: { title: 'Action required', status: 'await', body: 'Please approve the transaction in your wallet' } })
			await approveToken({ signer, tokenAddress: from.token.address, receiverAddress: approvalTx.spender, fromAmount: approvalTx.amount })
		}
		manageDispatch({ type: 'PUSH_STEP', step: { title: 'Fetching transaction data', status: 'pending' } })
		const route = await retryRequest(
			async () =>
				await fetchEnsoRoute({
					chainId: from.chain.id,
					fromAddress: address,
					amountIn: addingAmountDecimals(from.amount, from.token.decimals)!,
					tokenIn: from.token.address,
					tokenOut: to.token.address,
				}),
			{ retryCount: 3 },
		)

		const transactionArgs = {
			...route.tx,
			gasLimit: BigNumber(manageState.route.gas._hex).times(1.8).toFixed(0).toString(),
		}
		manageDispatch({ type: 'PUSH_STEP', step: { title: 'Action required', status: 'await', body: 'Please approve the transaction in your wallet' } })
		await signer.sendTransaction(transactionArgs)

		manageDispatch({ type: 'SET_STATUS', payload: Status.success })
		manageDispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.success })
		manageDispatch({ type: 'PUSH_STEP', step: { title: 'Swap started successfully!', status: 'success' } })
	} catch (error) {
		console.error(error)
		handleError(error as Error, manageDispatch)
	} finally {
		manageDispatch({ type: 'SET_LOADING', payload: false })
	}
}
