import { type IQuest, type IQuestCondition, QuestConditionType } from '../../../../api/concero/quest/questType'
import { verifyUserQuest } from '../../../../api/concero/user/updateUser'
import { type IUser } from '../../../../api/concero/user/userType'

export enum QuestStatus {
	SUCCESS = 'success',
	FAILED = 'failed',
	ALREADY_DONE = 'already done',
}

const passUserQuest = async (quest: IQuest, user: IUser) => {
	return await verifyUserQuest(quest._id, user._id)
}

const verifyProvideLiquidity = async (
	user: IUser,
	quest: IQuest,
): Promise<{ status: QuestStatus; points: number | null }> => {
	return await verifyUserQuest(quest._id, user._id)
}

const verifyConnectDiscord = async (user: IUser) => {
	if (user.subscriptions.discord?.username) {
		return { status: QuestStatus.SUCCESS, points: 5 }
	}

	return { status: QuestStatus.FAILED, points: null }
}

const verifyConnectTwitter = async (user: IUser) => {
	if (user.subscriptions.twitter?.screen_name) {
		return { status: QuestStatus.SUCCESS, points: 5 }
	}

	return { status: QuestStatus.FAILED, points: null }
}

const verifyCommunityRewards = async (user: IUser, quest: IQuest) => {
	return await passUserQuest(quest, user)
}

export const verifyQuest = async (
	quest: IQuest,
	condition: IQuestCondition,
	user: IUser,
): Promise<{
	status: QuestStatus
	points: number | null
	message?: string
	discordRewardsMessage?: string
	communityRewardsMessage?: string
}> => {
	const { type } = condition

	if (type === QuestConditionType.ProvideLiquidity) {
		return await verifyProvideLiquidity(user, quest)
	}
	if (type === QuestConditionType.ConnectDiscord) {
		return await verifyConnectDiscord(user)
	}
	if (type === QuestConditionType.ConnectTwitter) {
		return await verifyConnectTwitter(user)
	}
	if (type === QuestConditionType.CommunityRewards) {
		return await verifyCommunityRewards(user, quest)
	}

	return { status: QuestStatus.FAILED, points: null }
}
