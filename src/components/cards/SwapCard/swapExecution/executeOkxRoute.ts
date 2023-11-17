import { providers } from 'ethers'
import { Dispatch } from 'react'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { fetchOkxTx } from '../../../../api/okx/fetchOkxTx'
import { IFetchOkxTransactionStatus, OKXRoute, OkxTx } from '../../../../api/okx/types'
import { fetchOkxTransactionStatus } from '../../../../api/okx/fetchOkxTransactionStatus'

async function checkOkxTransactionStatus(hash: string): Promise<IFetchOkxTransactionStatus> {
	let statusResponse = await fetchOkxTransactionStatus(hash as string)
	console.log(statusResponse)
	let status = statusResponse.detailStatus
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

async function sendOkxTransaction(tx: OkxTx, signer: providers.JsonRpcSigner, walletAddress: string): Promise<IFetchOkxTransactionStatus> {
	const sendTransactionArgs = {
		to: tx.to,
		from: walletAddress,
		value: tx.value,
		data: tx.data,
		// gasLimit: tx.gasLimit,
		// gasPrice: new BigNumber(tx.gasPrice).times(1e9).toString(),
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

	const isApproveNeeded = !!selectedRoute?.originalRoute?.routerList[0].needApprove ?? false
	console.log('isApproveNeeded', isApproveNeeded)

	// if (isApproveNeeded) {
	// 	await sendOkxTransaction(okxTransactionTx[0].tx, signer, walletAddress)
	// 	okxTransactionTx = await fetchOkxTx(selectedRoute?.originalRoute as OKXRoute, walletAddress, settings.slippage_percent, from.amount)
	// 	console.log(okxTransactionTx)
	// }

	const transactionStatus = await sendOkxTransaction(okxTransactionTx[0].tx, signer, walletAddress)
	console.log(transactionStatus)

	if (transactionStatus.detailStatus === 'SUCCESS') {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })
	} else {
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	}
}
