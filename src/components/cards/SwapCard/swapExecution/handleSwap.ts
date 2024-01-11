import { handleTransactionError } from '../handlers/handleTransactionError'
import { handleLifiResponse, handleRangoResponse } from './handleResponses'
import { updateLifiSteps } from './updateLifiSteps'
import { type GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'
import { type SwitchChainHookType } from '../SwapInput/types'
import { type Dispatch } from 'react'
import { executeRangoRoute } from './executeRangoRoute'
import { type Route } from '@lifi/types/dist/cjs'
import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'
import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import { type providers } from 'ethers'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'

interface HandleSwapProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string
	switchChainHook: SwitchChainHookType
	getChainByProviderSymbol: GetChainByProviderSymbolI
	getSigner: () => Promise<providers.JsonRpcSigner>
}

export const handleSwap = async ({ swapState, swapDispatch, address, switchChainHook, getChainByProviderSymbol, getSigner }: HandleSwapProps): Promise<void> => {
	const { from, settings, selectedRoute } = swapState
	const { originalRoute, provider } = selectedRoute

	if (!originalRoute) {
		console.error('No original route passed')
		return
	}

	swapDispatch({ type: 'SET_LOADING', payload: true })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.progress })

	try {
		if (provider === 'rango') {
			trackEvent({ category: category.SwapCard, action: action.BeginSwap, label: 'rango_begin_swap', data: originalRoute })
			const response = await executeRangoRoute({ route: originalRoute, address, from, settings, swapDispatch, switchChainHook, getChainByProviderSymbol })
			handleRangoResponse(response, swapDispatch)
		} else if (provider === 'lifi') {
			trackEvent({ category: category.SwapCard, action: action.BeginSwap, label: 'lifi_begin_swap', data: originalRoute })
			updateLifiSteps({ swapDispatch, selectedRoute })
			const updateRouteHook = (updatedRoute: Route) => {
				const stdRoute = standardiseLifiRoute(updatedRoute)
				updateLifiSteps({ swapDispatch, selectedRoute: stdRoute })
			}

			const signer = await getSigner()
			const acceptExchangeRateUpdateHook = async () => true

			const response = await executeLifiRoute(signer, originalRoute, { updateRouteHook, switchChainHook, acceptExchangeRateUpdateHook })
			handleLifiResponse(response, swapDispatch)
		}
	} catch (error: Error) {
		console.error('ERROR: ', error)
		handleTransactionError(error, swapDispatch, selectedRoute)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
