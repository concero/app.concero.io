import { rangoClient } from '../../../../api/rango/rangoClient'
import { CreateTransactionRequest } from 'rango-types/src/api/main/transactions'
import { BestRouteResponse } from 'rango-types/src/api/main/routing'
import { TransactionStatus } from 'rango-types/src/api/shared/transactions'
import { updateRangoTransactionStatus } from '../../../../api/rango/updateRangoTransactionStatus'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { Dispatch } from 'react'
import { SwitchChainHookType } from '../SwapInput/types'
import { GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'

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
	from: any
	settings: any
	switchChainHook: SwitchChainHookType
	swapDispatch: Dispatch<any>
	getChainByProviderSymbol: GetChainByProviderSymbolI
}

async function createAndSendRangoTransaction({
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
		type: 'SET_SWAP_STEPS',
		payload: [{ title: 'Action required', body: 'Please approve the transaction in your wallet', status: 'await', txLink: null }],
	})

	const rangoSymbol = route.result?.swaps[step - 1].from.blockchain
	console.log('rangoSymbol', rangoSymbol)
	if (!rangoSymbol) throw new Error('no rangoSymbol')

	const requiredChain = await getChainByProviderSymbol(rangoSymbol)
	console.log('requiredChain', requiredChain)
	if (!requiredChain) throw new Error('no requiredChain')

	const signer = await switchChainHook(parseInt(requiredChain.id))
	console.log('signer', signer)

	const swapOptions = getRangoSwapOptions(route, address, from, settings, step)
	console.log('rango swapOptions: ', swapOptions)

	const response = await rangoClient.createTransaction(swapOptions)
	if (!response.transaction || !response.ok) throw new Error('no transaction')
	console.log('response', response)

	return await signer.sendTransaction({
		data: response.transaction.data,
		to: response.transaction.to,
		value: response.transaction.value,
	})
}

interface ExecuteRangoRouteProps {
	route: BestRouteResponse
	address: string
	from: any
	settings: any
	swapDispatch: Dispatch<any>
	switchChainHook: SwitchChainHookType
	getChainByProviderSymbol: GetChainByProviderSymbolI
}

export async function executeRangoRoute({ route, address, from, settings, swapDispatch, switchChainHook, getChainByProviderSymbol }: ExecuteRangoRouteProps) {
	let step = 1
	let transactionResponse = await createAndSendRangoTransaction({ route, address, from, settings, switchChainHook, swapDispatch, getChainByProviderSymbol, step })
	console.log('transactionResponse', transactionResponse)

	while (step <= (route.result?.swaps.length || 1)) {
		try {
			const statusResponse = await rangoClient.checkStatus({ requestId: route.requestId, step, txId: transactionResponse.hash })
			const { status } = statusResponse
			console.log('statusResponse', statusResponse, JSON.stringify(statusResponse, null, 2))

			updateRangoTransactionStatus(statusResponse, swapDispatch)

			if (status === TransactionStatus.FAILED) return statusResponse
			if (status === TransactionStatus.SUCCESS) {
				step++
				if (step > (route.result?.swaps.length || 1)) return statusResponse
				transactionResponse = await createAndSendRangoTransaction({ route, address, from, settings, switchChainHook, swapDispatch, getChainByProviderSymbol, step })
				console.log('transactionResponse', transactionResponse)
			}
		} catch (error) {
			console.log('error', error)
			// TODO handle if can not check status of transaction
		}
		await sleep(5000)
	}
}
