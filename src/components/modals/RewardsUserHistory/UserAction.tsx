import classNames from './RewardsUserHistory.module.pcss'
import { useEffect, useState } from 'react'
import {
	ActionType,
	type IUserActionPopulated,
	TransactionType,
	type UserActionQuestData,
	type UserActionTxData,
} from '../../../api/concero/userActions/userActionType'
import { formatDateTime } from '../../../utils/formatting'

interface UserActionProps {
	action: IUserActionPopulated
}

export const UserAction = ({ action }: UserActionProps) => {
	const [value, setValue] = useState('')
	const isQuest = action.actionType === ActionType.questReward

	const getTransactionInfo = () => {
		const { from, to, type } = action.data as UserActionTxData

		const txAction = type === TransactionType.ConceroBridgeTx ? 'Bridge' : 'Swap'

		const txValue = `${txAction} from ${from.amount.toFixed(3)} ${from.tokenSymbol} on ${from.chainName} to ${to.amount.toFixed(3)} ${to.tokenSymbol} on ${to.chainName}`
		setValue(txValue)
	}

	const getQuestInfo = () => {
		const { name } = action.data as UserActionQuestData
		setValue(`Quest completed: ${name}`)
	}

	useEffect(() => {
		if (isQuest) {
			getQuestInfo()
		} else {
			getTransactionInfo()
		}
	}, [])

	return (
		<div className={classNames.userAction}>
			<p className={`${classNames.title} body2`}>{value}</p>

			<div className="row">
				<span className={`${classNames.points} body2`}>+ {action.points?.toFixed(2)} CERs</span>
				<p className={`${classNames.date} body2`}>
					{formatDateTime(new Date(action.timestamp), 'D MMM YYYY, hh:mm')}
				</p>
			</div>
		</div>
	)
}
