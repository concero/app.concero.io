export const handleRangoResponse = (executedRoute, swapDispatch, provider) => {
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

export const handleLifiResponse = (executedRoute, swapDispatch, provider) => {
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
