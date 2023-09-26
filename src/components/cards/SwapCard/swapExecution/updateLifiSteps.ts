const getStepStatus = action => {
	switch (action.status.toLowerCase()) {
		case 'done':
			return 'success'
		case 'pending':
			return 'pending'
		case 'failed':
			return 'error'
		default:
			return 'await'
	}
}

const getActionTitle = action => {
	if (action?.type === 'SWITCH_CHAIN') return action.status.toLowerCase() === 'action_required' ? 'Action Required' : 'Chain switched successfully'
	if (action?.message) return action.message
	if (action?.error?.message) return action.error.message
	return 'Transaction in progress'
}

const getActionBody = action => {
	if (action?.type === 'SWITCH_CHAIN' && action?.status.toLowerCase() === 'action_required') return 'Please approve the chain switch in your wallet'
	return action.substatusMessage ?? null
}

export const updateLifiSteps = ({ swapDispatch, selectedRoute }) => {
	const messages = selectedRoute.execution.reduce((acc, step) => {
		if (!step?.process) return acc

		const stepMessages = step.process.map(action => ({
			title: getActionTitle(action),
			body: getActionBody(action),
			status: getStepStatus(action),
			txLink: action.txLink ?? null,
		}))

		return [...acc, ...stepMessages]
	}, [])

	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: messages,
	})
}
