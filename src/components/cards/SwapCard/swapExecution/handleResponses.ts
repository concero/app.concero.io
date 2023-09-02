import { standardiseLifiRoute } from '../../../../api/lifi/standardiseLifiRoute'

export const handleRangoResponse = (executedRoute, swapDispatch, provider) => {
  if (executedRoute.status === 'failed') {
    swapDispatch({
      type: 'SET_RESPONSE',
      payload: {
        provider,
        isOk: false,
        message: executedRoute.error,
      },
    })
  } else if (executedRoute.status === 'success') {
    swapDispatch({
      type: 'SET_RESPONSE',
      payload: {
        provider,
        isOk: true,
        message: 'Success',
      },
    })
  }
}

export const handleLifiResponse = (executedRoute, swapDispatch, provider) => {
  const stdRoute = standardiseLifiRoute(executedRoute)
  const lastExecutionStep = stdRoute.execution[stdRoute.execution.length - 1]

  if (lastExecutionStep?.status.toLowerCase() === 'done') {
    swapDispatch({
      type: 'SET_RESPONSE',
      payload: {
        provider,
        isOk: true,
        message: 'Success',
      },
    })
    swapDispatch({
      type: 'SET_SWAP_STEP',
      payload: 'success',
    })
    return
  }

  if (lastExecutionStep?.status.toLowerCase() === 'failed') {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider,
        isOk: false,
        message: stdRoute.execution.error,
      },
    })
    swapDispatch({
      type: 'SET_SWAP_STEP',
      payload: 'error',
    })
    return
  }
}
