import { type Address } from 'viem'
import { fetchParentPoolActionsByLpAddress } from './fetchParentPoolActionsByLpAddress'

import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

export enum ParentPoolEventType {
	DepositInitiated,
	DepositCompleted,
	WithdrawalRequestInitiated,
	WithdrawalCompleted,
	CLFRequestError,
}

export const parentPoolEventNamesMap: Record<ParentPoolEventType, string> = {
	[ParentPoolEventType.DepositInitiated]: 'Deposit Initiated',
	[ParentPoolEventType.DepositCompleted]: 'Deposit Completed',
	[ParentPoolEventType.WithdrawalRequestInitiated]: 'Withdrawal Request Initiated',
	[ParentPoolEventType.WithdrawalCompleted]: 'Withdrawal Completed',
	[ParentPoolEventType.CLFRequestError]: 'CLF Request Error',
}

export const checkLastWithdrawRequest = async (lpAddress: Address) => {
	const actions = await fetchParentPoolActionsByLpAddress(lpAddress)

	for (const action of actions) {
		if (action.eventType === ParentPoolEventType.WithdrawalCompleted) {
			return null
		}

		if (action.eventType === ParentPoolEventType.WithdrawalRequestInitiated) {
			return action
		}
	}

	return null
}
