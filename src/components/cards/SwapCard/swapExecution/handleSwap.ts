import { viemSigner } from '../../../../web3/ethers'
import { handleTransactionError } from '../handlers/handleTransactionError'
import { executeRangoRoute } from './executeRangoRoute'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'

const handleExecuteRoute = async (route, provider, switchChainHook, address, from) => {
  console.log('ROUTE TO EXECUTE: ', route)
  if (provider === 'lifi') return await executeLifiRoute(viemSigner, route, { switchChainHook })
  if (provider === 'rango') return await executeRangoRoute(route, address, from)
}

const handleRangoResponse = (executedRoute, swapDispatch) => {
  if (executedRoute.status === 'failed') {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider,
        isOk: false,
        message: executedRoute.error,
      },
    })
  } else if (executedRoute.status === 'success') {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider,
        isOk: true,
        message: 'Success',
      },
    })
  }
}

const handleLifiResponse = (executedRoute, swapDispatch) => {
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

    if (provider === 'rango') {
      handleRangoResponse(executedRoute, swapDispatch)
    } else if (provider === 'lifi') {
      handleLifiResponse(executedRoute, swapDispatch)
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
