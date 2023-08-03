export const handleTransactionError = (e, swapDispatch) => {
  if (e.toString().toLowerCase().includes('user rejected')) {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider: 'lifi',
        isOk: false,
        message: 'user rejected',
      },
    })
  } else {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider: 'lifi',
        isOk: false,
        message: 'unknown error',
      },
    })
  }
}
