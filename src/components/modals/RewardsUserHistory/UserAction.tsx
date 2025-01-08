import classNames from './RewardsUserHistory.module.pcss'
import { useEffect, useState } from 'react'
import {
	ActionType,
	type IUserAction,
	TransactionType,
	type UserActionQuestData,
	type UserActionTxData,
} from '../../../api/concero/userActions/userActionType'
import { formatDateTime, formatNumber, toLocaleNumber } from '../../../utils/formatting'

interface UserActionProps {
	action: IUserAction
}

export const UserAction = ({ action }: UserActionProps) => {
	const [value, setValue] = useState('')

	const getTransactionInfo = () => {
		const { from, to, type } = action.data as UserActionTxData

		const txAction = type === TransactionType.ConceroBridgeTx ? 'Bridge' : 'Swap'
		const formattedFrom = formatNumber(from.amount)
		const formattedTo = formatNumber(to.amount)
		const txValue = `${txAction} from ${formattedFrom} ${from.tokenSymbol} on ${from.chainName} to ${formattedTo} ${to.tokenSymbol} on ${to.chainName}`
		setValue(txValue)
	}

	const getQuestInfo = () => {
		const { name } = action.data as UserActionQuestData
		setValue(`Quest completed: ${name}`)
	}

	useEffect(() => {
		if (action.actionType === ActionType.questReward) {
			getQuestInfo()
		}
		if (action.actionType === ActionType.transactionReward) {
			getTransactionInfo()
		}
		if (action.actionType === ActionType.specialReward) {
			const { name } = action.data as UserActionQuestData
			setValue(name)
		}
	}, [])

	return (
		<div className={classNames.userAction}>
			<p className={`${classNames.title} body2`}>{value}</p>

			<div className="row">
				<span className={`${classNames.points} body2`}>
					+ {action.points ? toLocaleNumber(action.points, 2) : 'n/a'} CERs
				</span>
				<p className={`${classNames.date} body2`}>
					{formatDateTime(new Date(action.timestamp), 'D MMM YYYY, HH:mm')}
				</p>
			</div>
		</div>
	)
}
