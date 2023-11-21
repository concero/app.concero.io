import { Contract, providers } from 'ethers'
import { Dispatch } from 'react'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { fetchOkxTx } from '../../../../api/okx/fetchOkxTx'
import { IFetchOkxTransactionStatus, OKXRoute, OkxTx } from '../../../../api/okx/types'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { okxSmartContractAddressesMap } from '../../../../api/okx/okxSmartContractAddressesMap'
import { fetchOkxTokenAllowance } from '../../../../api/okx/fetchOkxTokenAllowance'
import { fetchOkxTransactionStatus } from '../../../../api/okx/fetchOkxTransactionStatus'

async function checkOkxTransactionStatus(hash: string): Promise<IFetchOkxTransactionStatus> {
	let statusResponse = await fetchOkxTransactionStatus(hash as string)
	console.log(statusResponse)
	let status = statusResponse?.detailStatus
	console.log('Status: ', status)
	while (status !== 'SUCCESS' && status !== 'FAILURE') {
		statusResponse = await fetchOkxTransactionStatus(hash)
		console.log(statusResponse)
		status = statusResponse?.detailStatus
		await new Promise(resolve => setTimeout(resolve, 3000))
	}
	console.log(statusResponse)
	return statusResponse
}

async function checkApprovalTransactionStatus(hash: string, signer: providers.JsonRpcSigner): Promise<string> {
	const status = await signer.provider?.waitForTransaction(hash)
	console.log('status: ', status)
	return status.status?.toString() ?? '0'
}

async function checkIfApprovalNeeded(chainId: string, tokenAddress: string, walletAddress: string, fromAmount: string): Promise<boolean> {
	const tokenAllowance = await fetchOkxTokenAllowance(chainId, tokenAddress, walletAddress)
	console.log('tokenAllowance: ', tokenAllowance, fromAmount)
	return Number(fromAmount) > Number(tokenAllowance)
}

async function sendOkxTransaction(tx: OkxTx, signer: providers.JsonRpcSigner, walletAddress: string, swapDispatch: Dispatch<SwapAction>): Promise<IFetchOkxTransactionStatus> {
	const sendTransactionArgs = {
		to: tx.to,
		from: walletAddress,
		value: tx.value,
		data: tx.data,
	}
	console.log('sendTransactionArgs: ', sendTransactionArgs)
	const transactionTx = await signer.sendTransaction(sendTransactionArgs)

	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [{ status: 'pending', title: 'Transaction in progress', body: 'Please be patient, this may take up to 20 minutes.', txLink: null }],
	})

	return await checkOkxTransactionStatus(transactionTx.hash as string)
}

export async function executeOkxRoute(signer: providers.JsonRpcSigner, swapDispatch: Dispatch<SwapAction>, swapState: SwapState): Promise<void> {
	const { selectedRoute, from, settings } = swapState
	const walletAddress = from.address
	let okxTransactionTx = await fetchOkxTx(selectedRoute?.originalRoute as OKXRoute, walletAddress, settings.slippage_percent, from.amount)
	console.log(okxTransactionTx)

	const isApproveNeeded = await checkIfApprovalNeeded(from.chain.id, from.token.address, walletAddress, addingAmountDecimals(from.amount, from.token.decimals) as string)
	console.log('isApproveNeeded', isApproveNeeded)

	if (isApproveNeeded) {
		const approveContract = new Contract(from.token.address, ['function approve(address,uint256)'], signer)
		const approvalContractAddress = okxSmartContractAddressesMap[from.chain.id]
		if (!approvalContractAddress) throw new Error('No approval contract address found')
		const approveTx = await approveContract.approve(approvalContractAddress, addingAmountDecimals(from.amount, from.token.decimals))
		console.log('approveTx: ', approveTx)
		await checkApprovalTransactionStatus(approveTx.hash, signer)
	}

	const transactionStatus = await sendOkxTransaction(okxTransactionTx[0].tx, signer, walletAddress, swapDispatch)
	console.log(transactionStatus)

	if (transactionStatus.detailStatus === 'SUCCESS') {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ status: 'success', title: 'Swap completed', body: null, txLink: null }],
		})
	} else {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [
				{
					status: 'error',
					title: 'Transaction failed',
					body: 'Please look up the transaction in the explorer to find out the details.',
					txLink: null,
				},
			],
		})
	}
}