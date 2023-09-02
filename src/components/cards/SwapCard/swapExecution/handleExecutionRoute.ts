import { Route } from '../../../../api/lifi/types'
import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'
import { updateLifiSteps } from './updateLifiSteps'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'
import { viemSigner } from '../../../../web3/ethers'
import { executeRangoRoute } from './executeRangoRoute'

export const handleExecuteRoute = async ({ route, provider, address, from, swapDispatch, switchChainHook }) => {
  if (provider === 'lifi') {
    const updateRouteHook = (updatedRoute: Route) => {
      console.log(JSON.stringify(updatedRoute))
      console.log(updatedRoute)
      const stdRoute = standardiseLifiRoute(updatedRoute)
      updateLifiSteps({
        swapDispatch,
        selectedRoute: stdRoute,
      })
    }
    return executeLifiRoute(viemSigner, route, { updateRouteHook, switchChainHook })
  }
  if (provider === 'rango') return executeRangoRoute(route, address, from, swapDispatch)
}
