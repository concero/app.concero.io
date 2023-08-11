import { executeRoute } from '../../../../api/lifi/fetchLifiRoutes'
import { viemSigner } from '../../../../web3/ethers'
import { handleTransactionError } from '../handlers/handleTransactionError'
import { executeRangoRoute } from './executeRangoRoute'

const handleExecuteRoute = async (route, provider, switchChainHook, address, from) => {
  let response: any

  if (provider === 'lifi') {
    response = await executeRoute(viemSigner, route, { switchChainHook })
  } else if (provider === 'rango') {
    response = await executeRangoRoute(route, address, from)
  }

  return response
}

export const handleSwap = async (swapDispatch, originalRoute, switchChainHook, provider, address, from) => {
  if (!originalRoute) return console.error('No original route passed')

  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })

  try {
    const executedRoute = await handleExecuteRoute(originalRoute, provider, switchChainHook, address, from)
    console.log('EXECUTED ROUTE: ', executedRoute)

    if (executedRoute) {
      swapDispatch({
        type: 'SET_RESPONSES',
        payload: {
          provider,
          isOk: true,
          message: 'Success',
        },
      })
    }
  } catch (e) {
    console.log('ERROR: ', e)
    handleTransactionError(e, swapDispatch)
  }

  await swapDispatch({
    type: 'SET_LOADING',
    payload: false,
  })
}
