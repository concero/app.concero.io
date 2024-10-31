import { getRemainingTime, UserActionStatus, type UserTransaction } from './UserActions'
import { TransactionStatus } from '../../../api/concero/types'
import { type Dispatch, type SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '../../buttons/Button/Button'
import { trackEvent } from '../../../hooks/useTracking'
import { action as tracingAction, category } from '../../../constants/tracking'
import { completeWithdrawal, retryWithdrawal } from '../PoolCard/poolExecution/requestWithdraw'

interface Props {
	action: UserTransaction
	status: TransactionStatus
	setStatus: Dispatch<SetStateAction<TransactionStatus>>
	setRetryTimeLeft: Dispatch<SetStateAction<number>>
}

export const ManageWithdrawalButton = ({ action, status, setStatus, setRetryTimeLeft }: Props) => {
	const { address, chainId } = useAccount()
	const isActiveRequest = action.status === UserActionStatus.WithdrawRetryNeeded
	const isRetryRequestWithdraw = action.status === UserActionStatus.WithdrawRetryNeeded
	const isTxFailed = status === TransactionStatus.FAILED

	const handleCompleteWithdrawal = async () => {
		try {
			if (!address) return
			setStatus(TransactionStatus.PENDING)

			if (isRetryRequestWithdraw) {
				void trackEvent({
					category: category.PoolUserActions,
					action: tracingAction.BeginRetryWithdrawalRequest,
					label: tracingAction.BeginRetryWithdrawalRequest,
					data: { action },
				})

				const txStatus = await retryWithdrawal(address, chainId!)

				if (txStatus === TransactionStatus.SUCCESS) {
					const timeLeft = new Date().getTime()

					localStorage.setItem('retryPerformedTimestamp', String(timeLeft))
					setRetryTimeLeft(getRemainingTime(timeLeft))
					setStatus(TransactionStatus.SUCCESS)
				}

				setStatus(TransactionStatus.FAILED)
			} else {
				void trackEvent({
					category: category.PoolUserActions,
					action: tracingAction.BeginWithdrawalComplete,
					label: tracingAction.BeginWithdrawalComplete,
					data: { action },
				})

				const txStatus = await completeWithdrawal(address, chainId!)
				setStatus(txStatus)
			}
		} catch (error) {
			setStatus(TransactionStatus.FAILED)
			console.error(error)
		}
	}

	if (isActiveRequest || isRetryRequestWithdraw || isTxFailed) {
		return (
			<Button size="sm" variant="secondaryColor" onClick={handleCompleteWithdrawal}>
				{isRetryRequestWithdraw ? 'Retry' : 'Claim'}
			</Button>
		)
	}

	return null
}
