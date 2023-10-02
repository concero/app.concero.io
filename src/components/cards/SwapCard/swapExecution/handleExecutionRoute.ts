import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { updateLifiSteps } from './updateLifiSteps'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'
import { viemSigner } from '../../../../web3/ethers'
import { executeRangoRoute } from './executeRangoRoute'
import { Dispatch } from 'react'
import { BestRouteResponse, TransactionStatusResponse } from 'rango-sdk/src/types'
import { Route } from '@lifi/types'
import { GetChainByProviderSymbolI } from '../../../../hooks/DataContext/types'
import { SwitchChainHookType } from '../SwapInput/types'

type HandleExecuteRouteProps = {
	(params: {
		route: Route | BestRouteResponse
		provider: string
		address: string
		from: any
		settings: any
		swapDispatch: Dispatch<any>
		switchChainHook: SwitchChainHookType
		getChainByProviderSymbol: GetChainByProviderSymbolI
	}): Promise<TransactionStatusResponse | Route>
}

export const handleExecuteRoute: HandleExecuteRouteProps = async ({ route, provider, address, from, settings, swapDispatch, switchChainHook, getChainByProviderSymbol }) => {
	if (provider === 'lifi') {
		const updateRouteHook = (updatedRoute: Route) => {
			const stdRoute = standardiseLifiRoute(updatedRoute)
			updateLifiSteps({
				swapDispatch,
				selectedRoute: stdRoute,
			})
		}

		const acceptExchangeRateUpdateHook = () => Promise.resolve(true)

		return executeLifiRoute(viemSigner, route, { updateRouteHook, switchChainHook, acceptExchangeRateUpdateHook })
	}
	if (provider === 'rango') return executeRangoRoute({ route, address, from, settings, swapDispatch, switchChainHook, getChainByProviderSymbol })
}
