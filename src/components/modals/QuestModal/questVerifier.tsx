import { type IQuest, type IQuestCondition, QuestConditionType } from '../../../api/concero/quest/questType'
import { type Address, formatUnits } from 'viem'
import { getLastDeposit } from '../../../api/concero/getUserActions'
import { verifyUserQuest } from '../../../api/concero/user/updateUser'
import { type IUser } from '../../../api/concero/user/userType'
import { getDiscordRole } from '../../../api/concero/socialNetworks/getDiscordRole'
import { discordRoleNamesMap, rewardsRolesMap } from './questVerifierConfig'
import { getAirdropWallet } from '../../../api/concero/airdropWallet/getAirdropWallet'

export enum QuestStatus {
	SUCCESS = 'success',
	FAILED = 'failed',
	ALREADY_DONE = 'already done',
}

const passUserQuest = async (quest: IQuest, user: IUser, points: number) => {
	const passedQuest = {
		id: quest._id,
		points,
		date: new Date().valueOf(),
	}

	// await updateUser(user._id, {
	// 	passedQuests: [...user.passedQuests, passedQuest],
	// })

	await verifyUserQuest(quest._id, user._id)
	return { status: QuestStatus.FAILED, points }
}

const verifyProvideLiquidity = async (
	user: IUser,
	quest: IQuest,
): Promise<{ status: QuestStatus; points: number | null }> => {
	const lastUserDeposit = await getLastDeposit(user.address as Address)

	if (!lastUserDeposit) {
		return { status: QuestStatus.FAILED, points: null }
	}

	const amount = formatUnits(lastUserDeposit.args.usdcAmount, 6)
	const points = Number(amount) * 0.05

	return await passUserQuest(quest, user, points)
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

const getRewardsByDiscordRole = async (user: IUser): Promise<{ points: number; roles: string[] }> => {
	if (user.subscriptions.discord?.username) {
		const response = await getDiscordRole(user.subscriptions.discord.id)
		const discordUserRoles = response.data.data

		const userRewardsRoles = discordUserRoles.filter(role => rewardsRolesMap[role])

		const userRolesPoints = userRewardsRoles.reduce((acc: number, role: string) => {
			return acc + (rewardsRolesMap[role] ?? 0)
		}, 0)

		return { points: userRolesPoints > 250 ? 250 : userRolesPoints, roles: userRewardsRoles }
	}

	return { points: 0, roles: [] }
}

const verifyCommunityRewards = async (
	user: IUser,
	quest: IQuest,
): Promise<{ status: QuestStatus; points: number | null; message?: string }> => {
	const airdropWallet = await getAirdropWallet(user.address as Address)

	const airdropPoints = airdropWallet.roles.reduce((acc, role) => {
		const currentPoints = role === 'Early supporters' ? 250 : 25
		return acc + currentPoints
	}, 0)

	const { roles: discordRoles, points: discordPoints } = await getRewardsByDiscordRole(user)

	const userRewardsPointsText = airdropWallet.roles
		.reduce((acc, role) => {
			return acc + `, ${role}`
		}, '')
		.slice(1)

	const userDiscordRolesNames = discordRoles
		.reduce((acc, role) => {
			return acc + `, ${discordRoleNamesMap[String(role)]}`
		}, '')
		.slice(1)

	const communityRewardsMessage =
		airdropPoints > 0
			? `You got ${airdropPoints} CERs for being in these communities: ${userRewardsPointsText}`
			: 'You are not a member of any community'

	const discrodRewardsMessage =
		discordPoints > 0
			? `You ${discordPoints} got CERs for these discord roles: ${userDiscordRolesNames}. \n`
			: "You don't have any roles in our Discord. \n"

	const passUserResult = await passUserQuest(quest, user, airdropPoints + discordPoints)

	return { ...passUserResult, message: discrodRewardsMessage + communityRewardsMessage }
}

export const verifyQuest = async (
	quest: IQuest,
	condition: IQuestCondition,
	user: IUser,
): Promise<{ status: QuestStatus; points: number | null; message?: string }> => {
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
