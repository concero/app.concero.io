import { type Address } from 'viem'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { fetchParentPoolActionsByLpAddress } from './fetchParentPoolActionsByLpAddress'

dayjs.extend(isSameOrBefore)

export const poolEventNamesMap = {
	ConceroParentPool_DepositCompleted: 'Deposit',
	ConceroParentPool_WithdrawRequestInitiated: 'Withdrawal Submitted',
	ConceroParentPool_Withdrawn: 'Withdrawal Complete',
}

export const checkLastWithdrawRequest = async (lpAddress: Address) => {
	const actions = await fetchParentPoolActionsByLpAddress(lpAddress)

	for (const action of actions) {
		if (action.eventName === 'ConceroParentPool_Withdrawn') {
			return null
		}

		if (action.eventName === 'ConceroParentPool_WithdrawRequestInitiated') {
			return action
		}
	}

	return null
}
