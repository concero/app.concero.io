export const handleTransactionError = (e, swapDispatch, provider) => {
	if (e.toString().toLowerCase().includes('user rejected')) {
		swapDispatch({
			type: 'SET_RESPONSE',
			payload: { provider, isOk: false, message: 'user rejected' },
		})
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Cancelled by user', body: 'Transaction was cancelled', status: 'error' },
		})
	} else if (e.toString().toLowerCase().includes('insufficient')) {
		swapDispatch({
			type: 'SET_RESPONSE',
			payload: { provider, isOk: false, message: 'Insufficient balance' },
		})
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Insufficient balance', body: 'Please check your balance and try again', status: 'error' },
		})
	} else {
		swapDispatch({
			type: 'SET_RESPONSE',
			payload: { provider, isOk: false, message: 'unknown error' },
		})
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: { title: 'Transaction failed', body: 'Something went wrong', status: 'error' },
		})
	}
	swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'failure' })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'failed' })
}
