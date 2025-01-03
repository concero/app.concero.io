import classNames from './UserActions.module.pcss'
import { parentPoolEventNamesMap, ParentPoolEventType } from '../../../api/concero/getUserActions'
import { UserActionStatus, type UserTransaction } from './UserActions'
import { type Dispatch, type ReactNode, type SetStateAction, useEffect, useState } from 'react'
import { TransactionStatus } from '../../../api/concero/types'
import { Tag } from '../../layout/Tag/Tag'
import { ManageWithdrawalButton } from './ManageWithdrawalButton'
import { IS_TESTNET } from '../../../constants/config'

import dayjs from 'dayjs'

export const getWithdrawalDate = (timestampInMillis: number) => {
	if (!timestampInMillis) return

	const timestampInSeconds = Math.floor(timestampInMillis / 1000)
	const additionalTime = 597600 + (IS_TESTNET ? 0 : 3600)
	const deadline = timestampInSeconds + additionalTime

	const givenTime = dayjs.unix(deadline)
	const now = dayjs()

	let units = 'days'
	let timeLeft = givenTime.diff(now, 'days')

	if (timeLeft === 0) {
		units = 'hours'
		timeLeft = givenTime.diff(now, 'hours')
	}

	if (timeLeft === 0) {
		units = 'minutes'
		timeLeft = givenTime.diff(now, 'minutes')
	}

	return `Locked, ${timeLeft} ${units} left`
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

	const isRequestWithdrawal = action.eventType === ParentPoolEventType.WithdrawalRequestInitiated
	const isWithdrawRetryPending = retryTimeLeft !== 0 && action.isActiveWithdraw

	useEffect(() => {
		if (action.status === UserActionStatus.WithdrawRetryNeeded && !isWithdrawRetryPending) {
			setStatus(TransactionStatus.FAILED)
		} else {
			setStatus(TransactionStatus.IDLE)
		}
	}, [retryTimeLeft])

	const stageTagMap: Record<TransactionStatus, ReactNode> = {
		[TransactionStatus.IDLE]: null,
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

	const amountSign = action.eventType === ParentPoolEventType.DepositCompleted ? '+' : '-'

	const retryTimeLeftInMinutes = Math.floor(retryTimeLeft / 60)

	return (
		<div className={classNames.action}>
			<div className={classNames.leftSide}>
				<h6>{parentPoolEventNamesMap[action.eventType ?? 0]}</h6>

				{action.isActiveWithdraw && !isWithdrawalAvailable && isRequestWithdrawal ? (
					<Tag variant="neutral" size="sm">
						{getWithdrawalDate(action.time)}
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
			<div className={classNames.button}>
				<ManageWithdrawalButton
					setRetryTimeLeft={setRetryTimeLeft}
					status={status}
					setStatus={setStatus}
					action={action}
				/>
			</div>
		</div>
	)
}
