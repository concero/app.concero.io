import classNames from './RewardsUserHistory.module.pcss'
import { useEffect, useState } from 'react'
import {
	ActionType,
	type IUserAction,
	TransactionType,
	type UserActionQuestData,
} from '../../../api/concero/userActions/userActionType'
import { formatDateTime, toLocaleNumber } from '../../../utils/formatting'

interface UserActionProps {
	action: IUserAction
}

export const UserAction = ({ action }: UserActionProps) => {
	const [value, setValue] = useState('')

	const getTransactionInfo = () => {
		//@ts-expect-error TODO: Improve Typing
		const txAction = action.data?.type === TransactionType.ConceroBridgeTx ? 'Bridge' : 'Swap'
		// @ts-expect-error TODO: Improve typing
		if (!action.data?.from || !action.data?.to) {
			setValue('Forgotten transaction')
			return
		}
		// @ts-expect-error Improve Typing
		const { from, to } = action.data
		const txValue = `${txAction} from ${toLocaleNumber(from.amount, 2)} ${from.tokenSymbol} on ${from.chainName} to ${toLocaleNumber(to.amount, 2)} ${to.tokenSymbol} on ${to.chainName}`
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
	const timestampInMs = action.timestamp.toString().length === 10 ? action.timestamp * 1000 : action.timestamp

	const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')

	return (
		<div className={classNames.userAction}>
			<p className={`${classNames.title} body2`}>{value}</p>

			<div className="row">
				<span className={`${classNames.points} body2`}>
					+ {action.points ? toLocaleNumber(action.points, 2) : 'n/a'} CERs
				</span>
				<p className={`${classNames.date} body2`}>{formattedDate}</p>
			</div>
		</div>
	)
}
