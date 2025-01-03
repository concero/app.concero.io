import { getRemainingTime, UserActionStatus, type UserTransaction } from './UserActions'
import { TransactionStatus } from '../../../api/concero/types'
import { type Dispatch, type SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '../../buttons/Button/Button'
import { trackEvent } from '../../../hooks/useTracking'
import { action as tracingAction, category } from '../../../constants/tracking'
import { retryWithdrawal } from '../PoolCard/poolExecution/requestWithdraw'

interface Props {
	action: UserTransaction
	status: TransactionStatus
	setStatus: Dispatch<SetStateAction<TransactionStatus>>
	setRetryTimeLeft: Dispatch<SetStateAction<number>>
}

export const ManageWithdrawalButton = ({ action, status, setStatus, setRetryTimeLeft }: Props) => {
	const { address, chainId } = useAccount()
	const isRetryRequestWithdraw = action.status === UserActionStatus.WithdrawRetryNeeded
	const isTxFailed = status === TransactionStatus.FAILED
	const isPending = status === TransactionStatus.PENDING
	const isSuccess = status === TransactionStatus.SUCCESS

	const retryPerformedTimestamp = localStorage.getItem('retryPerformedTimestamp')
	const isRetryPerformed = retryPerformedTimestamp && getRemainingTime(retryPerformedTimestamp) > 0

	const handleRetryWithdrawal = async () => {
		try {
			if (!address) return
			setStatus(TransactionStatus.PENDING)

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
			} else {
				setStatus(TransactionStatus.FAILED)
			}
		} catch (error) {
			setStatus(TransactionStatus.FAILED)
			console.error(error)
		}
	}

	if (isRetryPerformed || isSuccess || isPending) {
		return null
	}

	if (isRetryRequestWithdraw || isTxFailed) {
		return (
			<Button size="sm" variant="secondaryColor" onClick={handleRetryWithdrawal}>
				Retry
			</Button>
		)
	}

	return null
}
