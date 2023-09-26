import { handleTransactionError } from '../handlers/handleTransactionError'
import { handleLifiResponse, handleRangoResponse } from './handleResponses'
import { handleExecuteRoute } from './handleExecutionRoute'
import { updateLifiSteps } from './updateLifiSteps'

export const handleSwap = async ({ swapState, swapDispatch, address, switchChainHook }) => {
	const { from, settings, selectedRoute } = swapState
	const { originalRoute, provider } = selectedRoute

	if (!originalRoute) return console.error('No original route passed')

	swapDispatch({ type: 'SET_LOADING', payload: true })
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: 'progress' })
	swapDispatch({ type: 'SET_SWAP_STATUS', payload: 'progress' })

	if (provider === 'lifi') {
		updateLifiSteps({ swapDispatch, selectedRoute })
	} else if (provider === 'rango') {
		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [
				{
					title: 'Action required',
					body: 'Please approve the transaction in your wallet',
					status: 'await',
					txLink: null,
				},
			],
		})
	}

	try {
		const executedRoute = await handleExecuteRoute({
			route: originalRoute,
			provider,
			address,
			from,
			settings,
			swapDispatch,
			switchChainHook,
		})

		if (provider === 'rango') {
			handleRangoResponse(executedRoute, swapDispatch, provider)
		} else if (provider === 'lifi') {
			handleLifiResponse(executedRoute, swapDispatch, provider)
		}
	} catch (error) {
		console.log('ERROR: ', error)
		handleTransactionError(error, swapDispatch, provider)
		// swapDispatch({
		//   type: 'APPEND_SWAP_STEP',
		//   payload: {
		//     index: 0,
		//     status: 'error',
		//     title: 'Transaction failed',
		//     body: error.message ?? error.message ?? error ?? 'Something went wrong',
		//   },
		// })
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
