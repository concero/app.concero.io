export const handleTransactionError = (e, swapDispatch, provider) => {
  if (e.toString().toLowerCase().includes('user rejected')) {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider,
        isOk: false,
        message: 'user rejected',
      },
    })
  } else if (e.toString().toLowerCase().includes('insufficient')) {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider,
        isOk: false,
        message: 'Insufficient balance',
      },
    })
  } else {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider,
        isOk: false,
        message: 'unknown error',
      },
    })
  }
}
