import { TransactionRequest } from '@ethersproject/abstract-provider/src.ts/index'
import { EvmTransaction, RangoClient, TransactionStatus } from 'rango-sdk'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function prepareEvmTransaction(evmTx: EvmTransaction, isApprove: boolean): TransactionRequest {
	const gasPrice = !!evmTx.gasPrice && !evmTx.gasPrice.startsWith('0x') ? `0x${parseInt(evmTx.gasPrice).toString(16)}` : null

	const manipulatedTx = {
		...evmTx,
		gasPrice,
	}

	let tx = {}
	if (manipulatedTx.from) tx = { ...tx, from: manipulatedTx.from }
	if (isApprove) {
		if (manipulatedTx.approveTo) tx = { ...tx, to: manipulatedTx.approveTo }
		if (manipulatedTx.approveData) tx = { ...tx, data: manipulatedTx.approveData }
	} else {
		if (manipulatedTx.txTo) tx = { ...tx, to: manipulatedTx.txTo }
		if (manipulatedTx.txData) tx = { ...tx, data: manipulatedTx.txData }
		if (manipulatedTx.value) tx = { ...tx, value: manipulatedTx.value }
		if (manipulatedTx.gasLimit) tx = { ...tx, gasLimit: manipulatedTx.gasLimit }
		if (manipulatedTx.gasPrice) tx = { ...tx, gasPrice: manipulatedTx.gasPrice }
	}
	return tx
}

export async function checkApprovalSync(requestId: string, txId: string, rangoClient: RangoClient) {
	while (true) {
		const approvalResponse = await rangoClient.isApproved(requestId, txId)
		if (approvalResponse.isApproved) return true
		await sleep(3000)
	}
}

export const checkTransactionStatusSync = async (requestId: string, txId: string, rangoClient: RangoClient, swapDispatch) => {
	while (true) {
		const txStatus = await rangoClient
			.status({
				requestId,
				txId,
			})
			.catch(e => {
				console.error(e)
			})

		if (txStatus) {
			console.log(txStatus)
			dispatchTransactionStatus(txStatus, swapDispatch)
		}
		if (!!txStatus.status && [TransactionStatus.FAILED, TransactionStatus.SUCCESS].includes(txStatus.status)) {
			return txStatus
		}
		await sleep(3000)
	}
}
