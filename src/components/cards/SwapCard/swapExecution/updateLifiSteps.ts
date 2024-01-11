import { type SwapAction } from '../swapReducer/types'
import { type Dispatch } from 'react'
import { type StandardRoute } from '../../../../types/StandardRoute'
import { type Process } from '@lifi/types/dist/cjs/step'

const getStepStatus = (action: Process) => {
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

const getActionTitle = (action: Process) => {
	if (action?.type === 'SWITCH_CHAIN') {
		return action.status.toLowerCase() === 'action_required' ? 'Action Required' : 'Chain switched successfully'
	}
	if (action?.message) return action.message
	if (action?.error?.message) return action.error.message
	return 'Transaction in progress'
}

const getActionBody = (action: Process) => {
	const { status, type, message, substatusMessage } = action
	if (type === 'SWITCH_CHAIN' && status.toLowerCase() === 'action_required') {
		return 'Please approve the chain switch in your wallet.'
	}
	if (message?.includes('An unexpected error occurred.') && (status === 'PENDING' || status === 'ACTION_REQUIRED')) {
		return 'Swap in progress.'
	}
	return substatusMessage ?? null
}

interface UpdateLifiSteps {
	swapDispatch: Dispatch<SwapAction>
	selectedRoute: StandardRoute
}

export const updateLifiSteps = ({ swapDispatch, selectedRoute }: UpdateLifiSteps) => {
	const messages = selectedRoute.execution.reduce((acc, step) => {
		if (!step?.process) return acc

		const stepMessages = step.process.map((action: Process) => ({
			title: getActionTitle(action),
			body: getActionBody(action),
			status: getStepStatus(action),
			txLink: action.txLink ?? null,
		}))

		return [...acc, ...stepMessages]
	}, [])

	if (messages.length && !messages[messages.length - 1]?.title.includes('user rejected')) {
		swapDispatch({ type: 'SET_SWAP_STEPS', payload: messages })
	}
}
