export const handleTransactionError = (e, swapDispatch) => {
  if (e.toString().toLowerCase().includes('user rejected')) {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider: 'lifi',
        isOk: false,
        massage: 'user rejected',
      },
    })
  } else {
    swapDispatch({
      type: 'SET_RESPONSES',
      payload: {
        provider: 'lifi',
        isOk: false,
        massage: 'unknown error',
      },
    })
  }
}
