import { viemSigner } from '../../../../web3/ethers'
import { handleTransactionError } from '../handlers/handleTransactionError'
import { executeRangoRoute } from './executeRangoRoute'
import { executeLifiRoute } from '../../../../api/lifi/executeLifiRoute'

const handleExecuteRoute = async (route, provider, address, from) => {
  if (provider === 'lifi') return await executeLifiRoute(viemSigner, route, {})
  if (provider === 'rango') return await executeRangoRoute(route, address, from)
}

const handleRangoResponse = (executedRoute, swapDispatch, provider) => {
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

const handleLifiResponse = (executedRoute, swapDispatch, provider) => {
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

export const handleSwap = async ({ swapDispatch, originalRoute, provider, address, from, switchChainHook }) => {
  if (!originalRoute) return console.error('No original route passed')

  swapDispatch({
    type: 'SET_LOADING',
    payload: true,
  })

  swapDispatch({
    type: 'SET_SWAP_STEP',
    payload: 'progress',
  })

  swapDispatch({
    type: 'PUSH_SWAP_PROGRESS',
    payload: {
      title: 'Transaction in progress',
      body: 'Waiting for confirmation',
      status: 'pending',
    },
  })

  try {
    await switchChainHook()
  } catch (e) {
    console.log('ERROR: ', e)
    swapDispatch({
      type: 'SET_LOADING',
      payload: false,
    })
    return
  }

  try {
    const executedRoute = await handleExecuteRoute(originalRoute, provider, address, from)

    if (provider === 'rango') {
      handleRangoResponse(executedRoute, swapDispatch, provider)
    } else if (provider === 'lifi') {
      handleLifiResponse(executedRoute, swapDispatch, provider)
    }
  } catch (e) {
    console.log('ERROR: ', e)
    handleTransactionError(e, swapDispatch, provider)
  } finally {
    swapDispatch({
      type: 'SET_LOADING',
      payload: false,
    })
  }
}
