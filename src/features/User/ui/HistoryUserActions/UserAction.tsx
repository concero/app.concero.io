import { IUserAction, UserActionQuestData, ActionType, TransactionType } from '@/api/concero/userActions/userActionType'
import { toLocaleNumber, formatDateTime } from '@/utils/formatting'
import clsx from 'clsx'
import cls from './HistoryUserActions.module.pcss'
interface UserActionProps {
	action: IUserAction
}

const getTransactionInfo = (action: IUserAction): string => {
	try {
		const txAction =
			// @ts-expect-error TODO: Improve Typing
			action.data?.type === TransactionType.ConceroBridgeTx ? 'Bridge' : 'Swap'

		// @ts-expect-error TODO: Improve Typing
		if (!action.data?.from || !action.data?.to) {
			return 'Forgotten transaction'
		}

		// @ts-expect-error Improve Typing
		const { from, to } = action.data
		return `${txAction} from ${toLocaleNumber(from.amount, 2)} ${from.tokenSymbol} on ${from.chainName} to ${toLocaleNumber(to.amount, 2)} ${to.tokenSymbol} on ${to.chainName}`
	} catch (error) {
		console.log('Error:', error, 'action', action)
		return ''
	}
}

const getActionInfo = (action: IUserAction): JSX.Element => {
	try {
		const txAction =
			// @ts-expect-error TODO: Improve Typing
			action.data?.type === TransactionType.ConceroBridgeTx ? 'Bridge' : 'Swap'

		// @ts-expect-error TODO: Improve Typing
		if (!action.data?.from || !action.data?.to) {
			return <span>'Forgotten transaction'</span>
		}

		// @ts-expect-error Improve Typing
		const { from, to } = action.data
		return (
			<span className={cls.action_info}>
				<span className={cls.action}>{txAction}</span>
				<span className={cls.from_to}> from </span>
				<span className={cls.amount_value}>
					{toLocaleNumber(from.amount, 2)} {from.tokenSymbol} on {from.chainName}
				</span>
				<span className={cls.from_to}> to </span>
				<span className={cls.amount_value}>
					{toLocaleNumber(to.amount, 2)} {to.tokenSymbol} on {to.chainName}
				</span>
			</span>
		)
	} catch (error) {
		console.log('Error:', error, 'action', action)
		return <></>
	}
}

const getQuestInfo = (action: IUserAction): string => {
	const { name } = action.data as UserActionQuestData
	return `Quest completed: ${name}`
}

export const UserAction = ({ action }: UserActionProps) => {
	const getValue = (): string | JSX.Element => {
		switch (action.actionType) {
			case ActionType.questReward:
				return getQuestInfo(action)
			case ActionType.transactionReward:
				return getActionInfo(action)
			case ActionType.specialReward:
				const { name } = action.data as UserActionQuestData
				return name
			default:
				return ''
		}
	}

	const timestampInMs = action.timestamp.toString().length === 10 ? action.timestamp * 1000 : action.timestamp
	const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')

	return (
		<div className={clsx(cls.user_action)}>
			<p className={clsx(cls.title)}>{getValue()}</p>

			<div className={cls.meta_wrap}>
				<span className={clsx(cls.points)}>
					+ {action.points ? toLocaleNumber(action.points, 2) : 'n/a'} CERs
				</span>
				<p className={clsx(cls.date)}>{formattedDate}</p>
			</div>
		</div>
	)
}
