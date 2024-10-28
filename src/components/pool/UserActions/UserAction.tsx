import classNames from './UserActions.module.pcss'
import { poolEventNamesMap } from '../../../api/concero/getUserActions'
import dayjs from 'dayjs'
import { UserActionStatus, type UserTransaction } from './UserActions'
import { type Dispatch, type ReactNode, type SetStateAction, useEffect, useState } from 'react'
import { TransactionStatus } from '../../../api/concero/types'
import { Tag } from '../../tags/Tag/Tag'
import { ManageWithdrawalButton } from './ManageWithdrawalButton'

export const checkWithdrawAvailable = (deadline: number) => {
	const givenTime = dayjs.unix(deadline)
	const now = dayjs()

	if (now.isAfter(givenTime)) {
		return 'Claim available'
	}
	const diffInMilliseconds = givenTime.diff(now)
	const diffInDays = Math.ceil(dayjs.duration(diffInMilliseconds).asDays())

	return `Claim in: ${diffInDays}`
}

export const getWithdrawalDate = (deadline: number) => {
	if (!deadline) return

	const oneHour = 3600
	const givenTime = dayjs.unix(deadline + oneHour)
	const now = dayjs()

	let timeLeft = now.diff(givenTime, 'days')

	if (timeLeft === 0) {
		timeLeft = now.diff(givenTime, 'hours')
	}

	return `Locked, ${timeLeft} days left`
}

interface Props {
	action: UserTransaction
	retryTimeLeft: number
	setRetryTimeLeft: Dispatch<SetStateAction<number>>
}

export const UserAction = ({ action, retryTimeLeft, setRetryTimeLeft }: Props) => {
	const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.IDLE)
	const isRetryRequestWithdraw = action.status === UserActionStatus.WithdrawRetryNeeded

	const isWithdrawalAvailable =
		action.status === UserActionStatus.ActiveRequestWithdraw ||
		action.status === UserActionStatus.WithdrawRetryNeeded

	const isRequestWithdrawal = action.eventName === 'ConceroParentPool_WithdrawRequestInitiated'
	const isWithdrawRetryPending = retryTimeLeft !== 0 && action.isActiveWithdraw

	useEffect(() => {
		if (action.status === UserActionStatus.WithdrawRetryNeeded && !isWithdrawRetryPending) {
			setStatus(TransactionStatus.FAILED)
		} else {
			setStatus(TransactionStatus.IDLE)
		}
	}, [retryTimeLeft])

	const stageTagMap: Record<TransactionStatus, ReactNode> = {
		[TransactionStatus.FAILED]: (
			<Tag variant="negative" size="sm">
				Failed
			</Tag>
		),
		[TransactionStatus.PENDING]: (
			<Tag variant="branded" size="sm">
				Pending
			</Tag>
		),
		[TransactionStatus.SUCCESS]: !isRetryRequestWithdraw && (
			<Tag variant="positive" size="sm">
				Success!
			</Tag>
		),
	}

	const amountSign = action.eventName === 'ConceroParentPool_DepositCompleted' ? '+' : '-'

	const retryTimeLeftInMinutes = Math.floor(retryTimeLeft / 60)

	return (
		<div className={classNames.action}>
			<div className={classNames.leftSide}>
				<h6>{poolEventNamesMap[action.eventName]}</h6>

				{action.isActiveWithdraw && !isWithdrawalAvailable && isRequestWithdrawal ? (
					<Tag variant="neutral" size="sm">
						{getWithdrawalDate(action.args.deadline)}
					</Tag>
				) : (
					(stageTagMap[status] ?? null)
				)}

				{isWithdrawRetryPending && (
					<Tag variant="neutral" size="sm">
						{retryTimeLeftInMinutes
							? `Pending ${String(retryTimeLeftInMinutes)} min`
							: ' Pending less than a minute'}
					</Tag>
				)}
			</div>
			<h6 className={classNames.value}>
				{Number(action.amount) !== 0 && (
					<>
						{amountSign}
						{action.amount && Number(action.amount).toFixed(0)} USDC
					</>
				)}
			</h6>

			<div className={classNames.date}>
				<p className="body1">{dayjs(action.time).format('DD MMM YYYY, HH:mm')}</p>
			</div>
			<ManageWithdrawalButton
				setRetryTimeLeft={setRetryTimeLeft}
				status={status}
				setStatus={setStatus}
				action={action}
			/>
		</div>
	)
}
