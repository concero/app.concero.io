import { Dispatch } from 'react'
import { ManageAction, ManageState } from './useManageReducer/types'
import { Status } from './constants'
import { getSigner } from '../../../../web3/getSigner'
import { SwitchNetworkArgs, SwitchNetworkResult } from '@wagmi/core'
import { Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { fetchApprovalTx } from '../../../../api/enso/approvalTx'
import { retryRequest } from '../../../../utils/retryRequest'
import { fetchEnsoRoute } from '../../../../api/enso/fetchEnsoQuote'

function handleError(error: Error, manageDispatch: Dispatch<ManageAction>): void {
	if (error.message.includes('INSUFFICIENT_GAS_TOKENS')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.balanceError })
	} else if (error.message.toLowerCase().includes('user rejected')) {
		manageDispatch({ type: 'SET_STATUS', payload: Status.canceled })
	} else {
		manageDispatch({ type: 'SET_STATUS', payload: Status.unknownError })
	}
}

type SwitchChainNetwork = (chainId_?: SwitchNetworkArgs['chainId']) => Promise<SwitchNetworkResult>

async function approveToken({ signer, tokenAddress, receiverAddress, fromAmount }): Promise<void> {
	console.log('approveToken', receiverAddress, tokenAddress, fromAmount)
	const erc20 = new Contract(tokenAddress, ['function approve(address,uint256)'], signer)
	return (await erc20.approve(receiverAddress, fromAmount)).wait()
}

export async function handleExecuteSwap(manageState: ManageState, manageDispatch: Dispatch<ManageAction>, switchNetworkAsync: SwitchChainNetwork): Promise<void> {
	manageDispatch({ type: 'SET_LOADING', payload: true })
	manageDispatch({ type: 'SET_STATUS', payload: Status.loading })

	if (!manageState.route) return
	const { from, address, to } = manageState

	try {
		const signer = await getSigner(Number(from.chain.id), switchNetworkAsync)
		// const ensoWallet = await fetchEnsoWallet(from.chain.id, manageState.address)
		// console.log('ensoWallet', ensoWallet)
		// if (!ensoWallet || !ensoWallet.address) throw new 	Error('No Enso wallet found')
		const approvalTx = await fetchApprovalTx(from.chain.id, address, from.token.address, addingAmountDecimals(from.amount, from.token.decimals))
		console.log('approvalTx', approvalTx)
		// await signer.sendTransaction(approvalTx.tx)
		await approveToken({ signer, tokenAddress: from.token.address, receiverAddress: approvalTx.spender, fromAmount: approvalTx.amount })
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
		console.log('route tx', route.tx)
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
