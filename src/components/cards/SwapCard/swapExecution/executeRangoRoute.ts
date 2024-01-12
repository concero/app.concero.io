import { rangoClient } from '../../../../api/rango/rangoClient'
import { type CreateTransactionRequest } from 'rango-types/src/api/main/transactions'
import { type BestRouteResponse } from 'rango-types/src/api/main/routing'
import { TransactionStatus } from 'rango-types/src/api/shared/transactions'
import { updateRangoTransactionStatus } from '../../../../api/rango/updateRangoTransactionStatus'
import { type TransactionResponse } from '@ethersproject/abstract-provider'
import { type CheckApprovalResponse, type CreateTransactionResponse, type TransactionStatusResponse } from 'rango-sdk/src/types'
import { type CreateTransactionProps, type ExecuteRangoRouteProps } from './types'
import { type providers } from 'ethers'

const sleep = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

function getRangoSwapOptions(route: BestRouteResponse, address: string, from, settings, step): CreateTransactionRequest {
	return {
		requestId: route.requestId,
		step,
		userSettings: { slippage: '1.0', infiniteApprove: false },
		validations: { balance: false, fee: false },
	}
}

async function createAndSendRangoTransaction({
	signer,
	swapOptions,
}: {
	signer: providers.JsonRpcSigner
	swapOptions: CreateTransactionRequest
}): Promise<{ creation: CreateTransactionResponse; transaction: TransactionResponse }> {
	const creation = await rangoClient.createTransaction(swapOptions)
	if (!creation.transaction || !creation.ok) throw new Error('no transaction')

	const transaction = await signer.sendTransaction({
		data: creation.transaction.data,
		to: creation.transaction.to,
		value: creation.transaction.value,
		gasLimit: creation.transaction.gasLimit,
		gasPrice: creation.transaction.gasPrice,
		maxFeePerGas: creation.transaction.maxFeePerGas,
		maxPriorityFeePerGas: creation.transaction.maxPriorityFeePerGas,
		nonce: creation.transaction.nonce,
	})

	return { creation, transaction }
}

async function executeRangoSwap({
	route,
	address,
	from,
	settings,
	switchChainHook,
	swapDispatch,
	getChainByProviderSymbol,
	step,
}: CreateTransactionProps): Promise<TransactionResponse> {
	swapDispatch({
		type: 'APPEND_SWAP_STEP',
		payload: { title: 'Action required', body: 'Please approve the transaction in your wallet', status: 'await', txLink: null },
	})
	const rangoSymbol = route.result?.swaps[step - 1].from.blockchain
	if (!rangoSymbol) throw new Error('no rangoSymbol')

	const requiredChain = await getChainByProviderSymbol(rangoSymbol)
	if (!requiredChain) throw new Error('no requiredChain')

	const signer = await switchChainHook(parseInt(requiredChain.id))
	const swapOptions = getRangoSwapOptions(route, address, from, settings, step)

	let response = await createAndSendRangoTransaction({ signer, swapOptions })
	let approvalResponse: CheckApprovalResponse | undefined

	while (response.creation.transaction?.isApprovalTx) {
		while (true) {
			try {
				approvalResponse = await rangoClient.checkApproval(route.requestId)

				if (approvalResponse.isApproved) break
				if (!approvalResponse.isApproved && approvalResponse.txStatus === TransactionStatus.FAILED) break
				if (!approvalResponse.isApproved && approvalResponse.txStatus === TransactionStatus.SUCCESS) break
			} catch (error) {
				console.error('error', error)
			}
			await sleep(5000)
		}
		if (!approvalResponse.isApproved) throw new Error('transaction is not approved')
		response = await createAndSendRangoTransaction({ signer, swapOptions })
	}

	return response.transaction
}

export async function executeRangoRoute({
	route,
	address,
	from,
	settings,
	swapDispatch,
	switchChainHook,
	getChainByProviderSymbol,
}: ExecuteRangoRouteProps): Promise<TransactionStatusResponse | undefined> {
	let step = 1
	let transactionResponse = await executeRangoSwap({ route, address, from, settings, switchChainHook, swapDispatch, getChainByProviderSymbol, step })

	while (step <= (route.result?.swaps.length || 1)) {
		const statusResponse = await rangoClient.checkStatus({ requestId: route.requestId, step, txId: transactionResponse.hash })
		const { status } = statusResponse

		updateRangoTransactionStatus(statusResponse, swapDispatch)

		if (status === TransactionStatus.FAILED) return statusResponse
		if (status === TransactionStatus.SUCCESS) {
			step++
			if (step > (route.result?.swaps.length || 1)) return statusResponse
			transactionResponse = await executeRangoSwap({ route, address, from, settings, switchChainHook, swapDispatch, getChainByProviderSymbol, step })
		}

		await sleep(5000)
	}
}
