import { Route } from '../../../../api/lifi/types'
import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { updateLifiSteps } from './updateLifiSteps'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'
import { viemSigner } from '../../../../web3/ethers'
import { executeRangoRoute } from './executeRangoRoute'

export const handleExecuteRoute = async ({ route, provider, address, from, settings, swapDispatch, switchChainHook }) => {
  if (provider === 'lifi') {
    const updateRouteHook = (updatedRoute: Route) => {
      const stdRoute = standardiseLifiRoute(updatedRoute)
      updateLifiSteps({
        swapDispatch,
        selectedRoute: stdRoute,
      })
    }

    const acceptExchangeRateUpdateHook = () => true

    return executeLifiRoute(viemSigner, route, { updateRouteHook, switchChainHook, acceptExchangeRateUpdateHook })
  }
  if (provider === 'rango') return executeRangoRoute(route, address, from, settings, swapDispatch, switchChainHook)
}
