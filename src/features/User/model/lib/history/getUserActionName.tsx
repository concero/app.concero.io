import { TUserAction, TUserActionTxData, TUserActionQuestData } from '@/entities/User'
import { toLocaleNumber } from '@/utils/formatting'
import cls from './getUserActionName.module.pcss'

export interface UserActionProps {
	action: TUserAction
}
const getTxInfo = (action: TUserAction): JSX.Element => {
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
	return <span className={cls.title}>Quest "{actionData?.name}" Completed</span>
}
const getQuestStepInfo = (action: TUserAction) => {
	const actionData = action.data as TUserActionQuestData | null
	return <span className={cls.title}>Quest {actionData?.name} Step Completed</span>
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
	return <span className={cls.title}>{name} Connected</span>
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
	return <span className={cls.title}>{name} Disconnected</span>
}
const getSpecialRewardInfo = (action: TUserAction) => {
	const actionData = action.data as { name: string } | null
	return <span className={cls.title}>Special reward: {actionData?.name}</span>
}
const getAdminRewardInfo = (action: TUserAction) => {
	const actionData = action.data as { name: string } | null
	return <span className={cls.title}>CERs from the Team</span>
}

export const getUserActionName = (props: UserActionProps) => {
	const { action } = props
	switch (action.type) {
		case 'quest_completed':
			return getQuestInfo(action)
		case 'quest_step_completed':
			return getQuestStepInfo(action)
		case 'swap':
		case 'bridge':
			return getTxInfo(action)
		case 'special_reward_applied':
			return getSpecialRewardInfo(action)
		case 'x_connected':
		case 'discord_connected':
			return getSocialConnectInfo(action)
		case 'x_disconnected':
		case 'discord_disconnected':
			return getSocialDisconnectInfo(action)
		case 'admin_reward_applied':
			return getAdminRewardInfo(action)
		default:
			return <span>Unknown action</span>
	}
}
