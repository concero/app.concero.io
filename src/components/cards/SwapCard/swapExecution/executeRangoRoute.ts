import { rangoClient } from '../../../../api/rango/rangoClient'
import { CreateTransactionRequest } from 'rango-types/src/api/main/transactions'
import { BestRouteResponse } from 'rango-types/src/api/main/routing'
import { getSigner } from '../../../../web3/getSigner'
import { TransactionStatus } from 'rango-types/src/api/shared/transactions'
import { dispatchTransactionStatus } from '../../../../api/rango/dispatchTransactionStatus'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function getRangoSwapOptions(route: BestRouteResponse, address: string, from, settings, step): CreateTransactionRequest {
	return {
		requestId: route.requestId,
		step,
		userSettings: { slippage: '1.0', infiniteApprove: false },
		validations: { balance: false, fee: false },
	}
}

interface CreateTransactionProps {
	route: BestRouteResponse
	address: string
	step: number
}

async function createAndSendRangoTransaction({ route, address, from, settings, switchChainHook, step }: CreateTransactionProps) {
	try {
		await switchChainHook(from.chain.id)
	} catch (error) {
		throw new Error('user rejected')
	}

	const swapOptions = getRangoSwapOptions(route, address, from, settings, step)
	console.log('rango swapOptions: ', swapOptions)

	const response = await rangoClient.createTransaction(swapOptions)
	console.log('response', response)

	const signer = await getSigner(from.chain.id)
	console.log('signer', signer)
	if (!response.transaction) throw new Error('no transaction')

	return await signer.sendTransaction({
		data: response.transaction.data,
		to: response.transaction.to,
		value: response.transaction.value,
	})
}

interface ExecuteRangoRouteProps {
	route: BestRouteResponse
	address: string
}

export async function executeRangoRoute({ route, address, from, settings, swapDispatch, switchChainHook }: ExecuteRangoRouteProps) {
	let step = 1
	let txId = await createAndSendRangoTransaction({ route, address, from, settings, switchChainHook, step })
	let statusResponse

	while (step < (route.result?.swaps.length || 1)) {
		try {
			statusResponse = await rangoClient.checkStatus({ requestId: route.requestId, step, txId })
			const { status } = statusResponse
			console.log('statusResponse', statusResponse)

			dispatchTransactionStatus(statusResponse, swapDispatch)

			if (status === TransactionStatus.RUNNING) {
				await sleep(5000)
				continue
			}
			if (status === TransactionStatus.FAILED) return statusResponse
			if (status === TransactionStatus.SUCCESS) step++

			txId = await createAndSendRangoTransaction({ route, address, from, settings, switchChainHook, step })
			console.log('txId', txId)
		} catch (error) {
			console.log('error', error)
		}
	}

	return statusResponse
}
