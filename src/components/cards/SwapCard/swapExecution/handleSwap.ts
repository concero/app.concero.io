import { handleTransactionError } from '../handlers/handleTransactionError'
import { handleLifiResponse, handleRangoResponse } from './handleResponses'
import { updateLifiSteps } from './updateLifiSteps'
import { GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'
import { SwitchChainHookType } from '../SwapInput/types'
import { Dispatch } from 'react'
import { executeRangoRoute } from './executeRangoRoute'
import { Route } from '@lifi/types/dist/cjs'
import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'
import { SwapAction, SwapCardStage, SwapState } from '../swapReducer/types'
import { providers } from 'ethers'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { executeOkxRoute } from './executeOkxRoute'

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

	if (!originalRoute) return console.error('No original route passed')

	swapDispatch({ type: 'SET_LOADING', payload: true })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.progress })

	try {
		if (provider === 'rango') {
			const response = await executeRangoRoute({ route: originalRoute, address, from, settings, swapDispatch, switchChainHook, getChainByProviderSymbol })
			handleRangoResponse(response, swapDispatch, provider)
			trackEvent({ category: category.SwapCard, action: action.BeginSwap, label: 'rango_begin_swap', data: originalRoute })
		} else if (provider === 'lifi') {
			trackEvent({ category: category.SwapCard, action: action.BeginSwap, label: 'lifi_begin_swap', data: originalRoute })
			updateLifiSteps({ swapDispatch, selectedRoute })
			const updateRouteHook = (updatedRoute: Route) => {
				const stdRoute = standardiseLifiRoute(updatedRoute)
				updateLifiSteps({ swapDispatch, selectedRoute: stdRoute })
			}

			const signer = await getSigner()
			const acceptExchangeRateUpdateHook = () => Promise.resolve(true)

			const response = await executeLifiRoute(signer, originalRoute, { updateRouteHook, switchChainHook, acceptExchangeRateUpdateHook })
			handleLifiResponse(response, swapDispatch, provider)
		} else if (provider === 'okx') {
			swapDispatch({
				type: 'APPEND_SWAP_STEP',
				payload: { title: 'Action required', body: 'Please approve the transaction in your wallet', status: 'await', txLink: null },
			})
			const signer = await switchChainHook(Number(from.chain.id))
			await executeOkxRoute(signer, swapDispatch, swapState)
		}
	} catch (error: Error) {
		console.error('ERROR: ', error)
		handleTransactionError(error, swapDispatch)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
