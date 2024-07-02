import { createPublicClient, http, type WalletClient } from 'viem'
import { type Route } from '../types/routeTypes'
import { type InputRouteData } from '../types/contractInputTypes'
import { viemChains } from '../configs/chainsConfig'
import { conceroAddressesMap } from '../configs/conceroAddressesMap'
import { ExecuteRouteStage, type ExecutionConfigs, type ExecutionState } from '../types/executeSettingsTypes'
import { checkAllowanceAndApprove } from './checkAllowanceAndApprove'
import { sendTransaction } from './sendTransaction'
import { buildRouteData } from './buildRouteData'

const useSendStateHook = (executionConfigs: ExecutionConfigs) => {
	const { executionStateUpdateHook, executeInBackground } = executionConfigs

	return (state: ExecutionState) => {
		if (!executeInBackground && executionStateUpdateHook) {
			executionStateUpdateHook(state)
		}
	}
}

const executeRouteBase = async (walletClient: WalletClient, route: Route, executionConfigs: ExecutionConfigs) => {
	if (!walletClient) throw new Error('walletClient is not passed!')

	if (!route) throw new Error('Route is not passed!')

	const { data } = route
	const { switchChainHook } = executionConfigs
	const sendState = useSendStateHook(executionConfigs)

	if (data.to.amount === '0' || data.to.amount === '') throw new Error('Amount is empty!')
	if (data.from.token.address === data.to.token.address) throw new Error('Tokens are the same!')

	sendState({
		stage: ExecuteRouteStage.setChain,
		payload: {
			title: 'Switch chain',
			body: 'Please switch chain in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	if (!switchChainHook) {
		await walletClient.switchChain({ id: Number(data.from.chain.id) })
	} else {
		await switchChainHook(Number(data.from.chain.id))
	}

	sendState({
		stage: ExecuteRouteStage.setAddress,
		payload: {
			title: 'Get client address',
			body: 'Please get access to your address in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	const [clientAddress] = await walletClient.requestAddresses()

	const publicClient = createPublicClient({
		chain: viemChains[data.from.chain.id].chain,
		transport: http(viemChains[data.from.chain.id].transport),
	})

	const inputRouteData: InputRouteData = buildRouteData(data, clientAddress)
	const conceroAddress = conceroAddressesMap[data.from.chain.id]

	sendState({
		stage: ExecuteRouteStage.checkAllowance,
		payload: {
			title: 'Check allowance',
			body: 'Please input allowance and approve the transaction in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	await checkAllowanceAndApprove(walletClient, publicClient, data.from, clientAddress)

	sendState({
		stage: ExecuteRouteStage.pendingTransaction,
		payload: {
			title: 'Swap in progress',
			body: 'Please check info and approve the transaction in your wallet',
			status: 'await',
			txLink: null,
		},
	})

	await sendTransaction(inputRouteData, publicClient, walletClient, conceroAddress, clientAddress)

	sendState({
		stage: ExecuteRouteStage.successTransaction,
		payload: {
			title: 'Swap execute successfully!',
			body: 'Check your balance',
			status: 'success',
			txLink: null,
		},
	})
}

// test bridge and allowance (1 hour)
export const executeRoute = async (signer: WalletClient, route: Route, executionConfigs: ExecutionConfigs) => {
	const sendState = useSendStateHook(executionConfigs)

	try {
		await executeRouteBase(signer, route, executionConfigs)
	} catch (error) {
		console.error(error)
		sendState({
			stage: ExecuteRouteStage.internalError,
			payload: {
				title: 'Internal error',
				body: String(error),
				status: 'failed',
				txLink: null,
			},
		})

		throw new Error(String(error))
	}
}
