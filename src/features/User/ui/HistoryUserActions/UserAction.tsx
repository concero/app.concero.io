import { toLocaleNumber, formatDateTime } from '@/utils/formatting'
import clsx from 'clsx'
import cls from './HistoryUserActions.module.pcss'
import { TUserAction } from '@/entities/User'
import { TUserActionQuestData, TUserActionTxData, TUserActionType } from '@/entities/User/model/types/response'

interface UserActionProps {
	action: TUserAction
}
const getActionInfo = (action: TUserAction): JSX.Element => {
	try {
		const actionData = action.data as TUserActionTxData | null

		if (!actionData) {
			return <span>Forgotten transaction</span>
		}
		const { from, isTestnet, to } = actionData
		if (!from || !to) {
			return <span>Forgotten transaction</span>
		}
		const txAction = action.type === 'bridge' ? 'Bridge' : 'Swap'

		return (
			<span className={cls.action_info}>
				<span className={cls.action}>
					{isTestnet ? 'Testnet ' : null}
					{txAction}
				</span>
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
		if (__IS_DEV__) {
			console.log('Error:', error, 'action', action)
		}
		return <span>Forgotten transaction</span>
	}
}

const getQuestInfo = (action: TUserAction) => {
	const actionData = action.data as TUserActionQuestData | null
	return <span className={cls.title}>Quest completed: {actionData?.name}</span>
}
const getQuestStepInfo = (action: TUserAction) => {
	const actionData = action.data as TUserActionQuestData | null
	return <span className={cls.title}>Quest step completed: {actionData?.name}</span>
}
const getSocialConnectInfo = (action: TUserAction) => {
	const { type } = action

	let name = ''
	if (type === 'x_connected') {
		name = 'X'
	}
	if (type === 'discord_connected') {
		name = 'Discord'
	}
	return <span className={cls.title}>Connected social: {name}</span>
}
const getSocialDisconnectInfo = (action: TUserAction) => {
	const { type } = action

	let name = ''
	if (type === 'x_disconnected') {
		name = 'X'
	}
	if (type === 'discord_disconnected') {
		name = 'Discord'
	}
	return <span className={cls.title}>Disconnected social: {name}</span>
}

const getSpecialRewardInfo = (action: TUserAction) => {
	const actionData = action.data as { name: string } | null
	return <span className={cls.title}>Special reward: {actionData?.name}</span>
}

export const UserAction = ({ action }: UserActionProps) => {
	const getValue = (): string | JSX.Element => {
		switch (action.type) {
			case 'quest_completed':
				return getQuestInfo(action)
			case 'quest_step_completed':
				return getQuestStepInfo(action)
			case 'swap':
			case 'bridge':
				return getActionInfo(action)
			case 'special_reward_applied':
				return getSpecialRewardInfo(action)
			case 'x_connected':
			case 'discord_connected':
				return getSocialConnectInfo(action)
			case 'x_disconnected':
			case 'discord_disconnected':
				return getSocialDisconnectInfo(action)
			default:
				return <span>Unknown action</span>
		}
	}

	const timestampInMs = action.executedAt.toString().length === 10 ? action.executedAt * 1000 : action.executedAt
	const formattedDate = formatDateTime(new Date(timestampInMs), 'D MMM YYYY, HH:mm')

	return (
		<div className={clsx(cls.user_action)}>
			{getValue()}

			<div className={cls.meta_wrap}>
				<span className={clsx(cls.points)}>
					+{' '}
					{typeof action.points === 'string' || typeof action.points === 'number'
						? toLocaleNumber(action.points, 2)
						: 'n/a'}{' '}
					CERs
				</span>
				<p className={clsx(cls.date)}>{formattedDate}</p>
			</div>
		</div>
	)
}
