import { handleTransactionError } from '../handlers/handleTransactionError'
import { type GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'
import { type SwitchChainHookType } from '../SwapInput/types'
import { type Dispatch } from 'react'
import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { type providers } from 'ethers'
import { executeConceroRoute } from './executeConceroRoute'

interface HandleSwapProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string | undefined
	switchChainHook: SwitchChainHookType
	getChainByProviderSymbol: GetChainByProviderSymbolI
	getSigner: () => Promise<providers.JsonRpcSigner>
}

export const handleSwap = async ({
	swapState,
	swapDispatch,
	address,
	switchChainHook,
	getChainByProviderSymbol,
	getSigner,
}: HandleSwapProps): Promise<void> => {
	const { from, settings, selectedRoute } = swapState
	// const { originalRoute, provider } = selectedRoute
	//
	// if (!originalRoute) {
	// 	console.error('No original route passed')
	// 	return
	// }

	swapDispatch({ type: 'SET_LOADING', payload: true })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.progress })

	try {
		await executeConceroRoute()

		// if (provider === 'rango') {
		// 	void trackEvent({
		// 		category: category.SwapCard,
		// 		action: action.BeginSwap,
		// 		label: 'rango_begin_swap',
		// 		data: originalRoute,
		// 	})
		// 	const response = await executeRangoRoute({
		// 		route: originalRoute,
		// 		address,
		// 		from,
		// 		settings,
		// 		swapDispatch,
		// 		switchChainHook,
		// 		getChainByProviderSymbol,
		// 	})
		// 	handleRangoResponse(response, swapDispatch, selectedRoute)
		// } else if (provider === 'lifi') {
		// 	void trackEvent({
		// 		category: category.SwapCard,
		// 		action: action.BeginSwap,
		// 		label: 'lifi_begin_swap',
		// 		data: originalRoute,
		// 	})
		// 	updateLifiSteps({ swapDispatch, selectedRoute })
		// 	const updateRouteHook = (updatedRoute: Route) => {
		// 		const stdRoute = standardiseLifiRoute(updatedRoute)
		// 		updateLifiSteps({ swapDispatch, selectedRoute: stdRoute })
		// 	}
		//
		// 	const signer = await switchChainHook(Number(from.chain.id))
		// 	const acceptExchangeRateUpdateHook = async () => true
		//
		// 	const response = await executeLifiRoute(signer, originalRoute, {
		// 		updateRouteHook,
		// 		switchChainHook,
		// 		acceptExchangeRateUpdateHook,
		// 	})
		// 	handleLifiResponse(response, swapDispatch)
		// }
	} catch (error: Error) {
		console.error('ERROR: ', error)
		handleTransactionError(error, swapDispatch, selectedRoute)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
