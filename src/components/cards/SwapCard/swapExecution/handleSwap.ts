import { handleTransactionError } from '../handlers/handleTransactionError'
import { updateLifiSteps } from './updateLifiSteps'
import { handleLifiResponse, handleRangoResponse } from './handleResponses'
import { handleExecuteRoute } from './handleExecutionRoute'

export const handleSwap = async ({ swapState, swapDispatch, address, switchChainHook }) => {
  const { from, selectedRoute } = swapState
  const { originalRoute, provider } = selectedRoute
  if (!originalRoute) return console.error('No original route passed')

  swapDispatch({ type: 'SET_LOADING', payload: true })
  swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'progress' })

  if (provider === 'lifi') {
    updateLifiSteps({ swapDispatch, selectedRoute })
  } else if (provider === 'rango') {
    swapDispatch({
      type: 'SET_SWAP_STEPS',
      payload: [
        {
          title: 'Waiting for confirmation',
          body: 'Please confirm the transaction in your wallet',
          status: 'await',
          txLink: null,
        },
      ],
    })
    swapDispatch({
      type: 'SET_SWAP_STEPS',
      payload: [
        {
          status: 'success',
          title: 'Transaction success',
          // body: `Tx Hash: ${txStatus.bridgeData.srcTxHash}`,
          // txLink: txStatus.explorerUrl[0].url ?? null,
        },
      ],
    })
  }

  // try {
  //   await switchChainFunction()
  // } catch (e) {
  //   console.log('ERROR: ', e)
  //   swapDispatch({
  //     type: 'SET_LOADING',
  //     payload: false,
  //   })
  //   return
  // }

  try {
    const executedRoute = await handleExecuteRoute({
      route: originalRoute,
      provider,
      address,
      from,
      swapDispatch,
      switchChainHook,
    })

    if (provider === 'rango') {
      handleRangoResponse(executedRoute, swapDispatch, provider)
    } else if (provider === 'lifi') {
      handleLifiResponse(executedRoute, swapDispatch, provider)
    }
  } catch (e) {
    console.log('ERROR: ', e)
    handleTransactionError(e, swapDispatch, provider)
    swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'error' })
  } finally {
    swapDispatch({ type: 'SET_LOADING', payload: false })
  }
}
