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
import { viemSigner } from '../../../../web3/ethers'
import { SwapAction, SwapState } from '../swapReducer/types'

interface HandleSwapProps {
	swapState: SwapState
	swapDispatch: Dispatch<SwapAction>
	address: string
	switchChainHook: SwitchChainHookType
	getChainByProviderSymbol: GetChainByProviderSymbolI
}

export const handleSwap = async ({ swapState, swapDispatch, address, switchChainHook, getChainByProviderSymbol }: HandleSwapProps): Promise<void> => {
	const { from, settings, selectedRoute } = swapState
	const { originalRoute, provider } = selectedRoute

	if (!originalRoute) return console.error('No original route passed')

	swapDispatch({ type: 'SET_LOADING', payload: true })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'progress' })
	swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'pending' })

	try {
		if (provider === 'rango') {
			const response = await executeRangoRoute({ originalRoute, address, from, settings, swapDispatch, swapState, switchChainHook, getChainByProviderSymbol })
			handleRangoResponse(response, swapDispatch, provider)
		} else if (provider === 'lifi') {
			updateLifiSteps({ swapDispatch, selectedRoute })

			const updateRouteHook = (updatedRoute: Route) => {
				const stdRoute = standardiseLifiRoute(updatedRoute)
				updateLifiSteps({
					swapDispatch,
					selectedRoute: stdRoute,
				})
			}

			const acceptExchangeRateUpdateHook = () => Promise.resolve(true)
			const response = await executeLifiRoute(viemSigner, originalRoute, { updateRouteHook, switchChainHook, acceptExchangeRateUpdateHook })
			handleLifiResponse(response, swapDispatch, provider)
		}
	} catch (error) {
		console.log('ERROR: ', error)
		handleTransactionError(error, swapDispatch, provider)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
