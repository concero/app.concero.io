import { Contract, providers } from 'ethers'
import { Dispatch } from 'react'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { fetchOkxTx } from '../../../../api/okx/fetchOkxTx'
import { IFetchOkxTransactionStatus, OKXRoute, OkxTx } from '../../../../api/okx/types'
import { fetchOkxTransactionStatus } from '../../../../api/okx/fetchOkxTransactionStatus'
import { addingAmountDecimals } from '../../../../utils/formatting'
import { okxSmartContractAddressesMap } from '../../../../api/okx/okxSmartContractAddressesMap'
import { fetchOkxTokenAllowance } from '../../../../api/okx/fetchOkxTokenAllowance'

async function checkOkxTransactionStatus(hash: string): Promise<IFetchOkxTransactionStatus> {
	let statusResponse = await fetchOkxTransactionStatus(hash as string)
	console.log(statusResponse)
	let status = statusResponse.detailStatus
	console.log('Status: ', status)
	while (status !== 'SUCCESS' && status !== 'FAILURE') {
		statusResponse = await fetchOkxTransactionStatus(hash as string)
		console.log(statusResponse)
		status = statusResponse.detailStatus
		// updateOkxTransactionStatue(status, swapDispatch)
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

async function sendOkxTransaction(tx: OkxTx, signer: providers.JsonRpcSigner, walletAddress: string): Promise<IFetchOkxTransactionStatus> {
	const sendTransactionArgs = {
		to: tx.to,
		from: walletAddress,
		value: tx.value,
		data: tx.data,
	}
	console.log('sendTransactionArgs: ', sendTransactionArgs)
	const transactionTx = await signer.sendTransaction(sendTransactionArgs)
	return await checkOkxTransactionStatus(transactionTx.hash as string)
}

export async function executeOkxRoute(signer: providers.JsonRpcSigner, swapDispatch: Dispatch<SwapAction>, swapState: SwapState): Promise<void> {
	const { selectedRoute, from, settings } = swapState
	const walletAddress = from.address
	let okxTransactionTx = await fetchOkxTx(selectedRoute?.originalRoute as OKXRoute, walletAddress, settings.slippage_percent, from.amount)
	console.log(okxTransactionTx)

	const isApproveNeeded = await checkIfApprovalNeeded(from.chain.id, from.token.address, walletAddress, from.amount)
	console.log('isApproveNeeded', isApproveNeeded)

	if (isApproveNeeded) {
		const approveContract = new Contract(from.token.address, ['function approve(address,uint256)'], signer)
		const approvalContractAddress = okxSmartContractAddressesMap[from.chain.id]
		if (!approvalContractAddress) throw new Error('No approval contract address found')
		const approveTx = await approveContract.approve(approvalContractAddress, addingAmountDecimals(from.amount, from.token.decimals))
		console.log('approveTx: ', approveTx)
		await checkApprovalTransactionStatus(approveTx.hash, signer)
	}

	const transactionStatus = await sendOkxTransaction(okxTransactionTx[0].tx, signer, walletAddress)
	console.log(transactionStatus)

	if (transactionStatus.detailStatus === 'SUCCESS') {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
	} else {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	}
}
