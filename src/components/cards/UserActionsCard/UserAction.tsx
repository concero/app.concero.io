import classNames from './UserActionsCard.module.pcss'
import BlockiesSvg from 'blockies-react-svg'
import { poolEventNamesMap } from '../../../api/concero/getUserActions'
import dayjs from 'dayjs'
import { UserActionStatus, type UserTransaction } from './UserActionsCard'
import { type Dispatch, type ReactNode, type SetStateAction, useEffect, useState } from 'react'
import { TransactionStatus } from '../../../api/concero/types'
import { Tag } from '../../tags/Tag/Tag'
import { ManageWithdrawalButton } from './ManageWithdrawalButton'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'

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
	const givenTime = dayjs.unix(deadline)
	const now = dayjs()

	const diffInMilliseconds = now.from(givenTime, true)

	return `Available in ${diffInMilliseconds}`
}

interface Props {
	action: UserTransaction
	retryTimeLeft: number
	setRetryTimeLeft: Dispatch<SetStateAction<number>>
}

export const UserAction = ({ action, retryTimeLeft, setRetryTimeLeft }: Props) => {
	const [status, setStatus] = useState<TransactionStatus>(TransactionStatus.IDLE)

	const isWithdrawalAvailable =
		action.status === UserActionStatus.ActiveRequestWithdraw ||
		action.status === UserActionStatus.WithdrawRetryNeeded

	const isRequestWithdrawal = action.eventName === 'ConceroParentPool_WithdrawRequestInitiated'

	const stageTagMap: Record<TransactionStatus, ReactNode> = {
		[TransactionStatus.FAILED]: <Tag color="pink">Failed</Tag>,
		[TransactionStatus.PENDING]: (
			<Tag color="grey">
				Pending <LoadingAnimation color="var(--color-grey-500)" />
			</Tag>
		),
	}

	const amountSign = action.eventName === 'ConceroParentPool_DepositCompleted' ? '+' : '-'

	const isWithdrawRetryPending = retryTimeLeft !== 0 && action.isActiveWithdraw

	return (
		<div className={classNames.action}>
			<div className={classNames.leftSide}>
				<BlockiesSvg className={classNames.avatar} address={action.address} width={32} height={32} />
				<div>
					<h5>{poolEventNamesMap[action.eventName]}</h5>
					<p className="body1">{dayjs(action.time).format('D MMMM, HH:mm, YYYY')}</p>
				</div>
				{action.isActiveWithdraw && !isWithdrawalAvailable && isRequestWithdrawal ? (
					<Tag color="grey">{getWithdrawalDate(action.args.deadline)}</Tag>
				) : (
					stageTagMap[status]
				)}

				{isWithdrawRetryPending && (
					<Tag color="main">Pending {String(Math.floor(retryTimeLeft / 60))} min...</Tag>
				)}
			</div>
			<div className={classNames.rightSide}>
				{isWithdrawalAvailable || isWithdrawRetryPending ? (
					<ManageWithdrawalButton
						setRetryTimeLeft={setRetryTimeLeft}
						status={status}
						setStatus={setStatus}
						action={action}
					/>
				) : null}
				{action.amount !== '0' ? (
					<h4>
						{amountSign}
						{Number(action.amount).toFixed(0)} USDC
					</h4>
				) : null}
			</div>
		</div>
	)
}
