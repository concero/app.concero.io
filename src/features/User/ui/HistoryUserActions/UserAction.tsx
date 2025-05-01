import { toLocaleNumber, formatDateTime } from '@/utils/formatting'
import clsx from 'clsx'
import cls from './HistoryUserActions.module.pcss'
import type { IUserAction } from '@/entities/User'
import { EActionType } from '@/entities/User'
import { ETransactionType } from '@/entities/User'
import { IUserActionQuestData } from '@/entities/User'
import { useMemo } from 'react'
import { format, formatTokenAmount } from '@/shared/lib/utils/format'
type TAmount = {
	low: number
	high: number
	unsigned: boolean
}
function convertLongToObject(amount: TAmount) {
	const high = amount.high
	const low = amount.low
	const unsigned = amount.unsigned

	let result = high * Math.pow(2, 32) + low

	if (!unsigned && high < 0) {
		result = result - Math.pow(2, 64)
	}

	return result.toString()
}
interface UserActionProps {
	action: IUserAction
}
const getActionInfo = (action: IUserAction<EActionType.transactionReward>): JSX.Element => {
	try {
		const { from, to } = action.data
		const txAction = action.data?.type === ETransactionType.ConceroBridgeTx ? 'Bridge' : 'Swap'
		const isTestnet = action.tags?.includes('testnet')
		const formattedTestnetBalanceFrom = useMemo(
			() => (isTestnet ? formatTokenAmount(`${from.amount}`) : 0),
			[from.amount],
		)

		if (!action.data?.from || !action.data?.to) {
			return <span>Forgotten transaction</span>
		}

		return (
			<span className={cls.action_info}>
				<span className={cls.action}>
					{isTestnet ? 'Testnet ' : null}
					{txAction}
				</span>
				<span className={cls.from_to}> from </span>
				<span className={cls.amount_value}>
					{isTestnet ? format(Number(formattedTestnetBalanceFrom), 4) : toLocaleNumber(from.amount, 2)}{' '}
					{from.tokenSymbol} on {from.chainName}
				</span>
				<span className={cls.from_to}> to </span>
				<span className={cls.amount_value}>
					{isTestnet ? format(Number(formattedTestnetBalanceFrom), 4) : toLocaleNumber(to.amount, 2)}{' '}
					{to.tokenSymbol} on {to.chainName}
				</span>
			</span>
		)
	} catch (error) {
		console.log('Error:', error, 'action', action)
		return <span>Forgotten transaction</span>
	}
}

const getQuestInfo = (action: IUserAction<EActionType.questReward>) => {
	const { name } = action.data as IUserActionQuestData
	return <span className={cls.title}>Quest completed: {name}</span>
}
const getSpecialRewardInfo = (action: IUserAction<EActionType.specialReward>) => {
	const { name } = action.data as { name: string }
	return <span className={cls.title}>Special reward: {name}</span>
}

export const UserAction = ({ action }: UserActionProps) => {
	const getValue = (): string | JSX.Element => {
		switch (action.actionType) {
			case EActionType.questReward:
				//TODO: Improve type
				return getQuestInfo(action as IUserAction<EActionType.questReward>)
			case EActionType.transactionReward:
				//TODO: Improve type
				return getActionInfo(action as IUserAction<EActionType.transactionReward>)
			case EActionType.specialReward:
				//TODO: Improve type
				return getSpecialRewardInfo(action as IUserAction<EActionType.specialReward>)
			default:
				return ''
		}
	}

	const timestampInMs = action.timestamp.toString().length === 10 ? action.timestamp * 1000 : action.timestamp
	const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')

	return (
		<div className={clsx(cls.user_action)}>
			{getValue()}

			<div className={cls.meta_wrap}>
				<span className={clsx(cls.points)}>
					+ {action.points ? toLocaleNumber(action.points, 2) : 'n/a'} CERs
				</span>
				<p className={clsx(cls.date)}>{formattedDate}</p>
			</div>
		</div>
	)
}
