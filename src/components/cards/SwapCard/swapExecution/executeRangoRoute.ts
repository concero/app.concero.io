import { rangoClient } from '../../../../api/rango/rangoClient'
import { CreateTransactionRequest } from 'rango-types/src/api/main/transactions'
import { BestRouteResponse } from 'rango-types/src/api/main/routing'
import { checkApprovalSync, checkTransactionStatusSync, prepareEvmTransaction } from '../../../../api/rango/prepareEvmTransaction'

function getRangoSwapOptions(route: BestRouteResponse, address: string, from, settings): CreateTransactionRequest {
	return {
		requestId: route.requestId,
		step: 1,
		userSettings: { slippage: '1.0', infiniteApprove: false },
		validations: { balance: false, fee: false },
	}
}

export const executeRangoRoute = async (route: BestRouteResponse, address: string, from, settings, swapDispatch, switchChainHook) => {
	try {
		await switchChainHook(from.chain.id)
	} catch (error) {
		throw new Error('user rejected')
	}

	const swapOptions = getRangoSwapOptions(route, address, from, settings)

	console.log('rango swapOptions: ', swapOptions)

	const response = await rangoClient.createTransaction(swapOptions)

	console.log('response', response)

	if (!!response.error || response.resultType !== 'OK') {
		const msg = `Error swapping, message: ${response.error}, status: ${response.resultType}`
		throw new Error(msg)
	}

	const evmTransaction = response.tx as EvmTransaction

	if (response.approveTo && response.approveData) {
		const approveTx = prepareEvmTransaction(evmTransaction, true)
		const approveTxHash = (await viemSigner.sendTransaction(approveTx)).hash
		await checkApprovalSync(response.requestId, approveTxHash, rangoClient)
	}

	const mainTx = prepareEvmTransaction(evmTransaction, false)
	const mainTxHash = (await viemSigner.sendTransaction(mainTx)).hash

	return checkTransactionStatusSync(response.requestId, mainTxHash, rangoClient, swapDispatch)
}
