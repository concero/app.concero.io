import { type IQuest, type QuestCondition, QuestConditionType } from '../../../api/concero/quest/questType'
import { type Address, formatUnits } from 'viem'
import { getLastDeposit } from '../../../api/concero/getUserActions'
import { updateUser } from '../../../api/concero/user/updateUser'
import { type IUser } from '../../../api/concero/user/userType'

export const verifyQuest = async (quest: IQuest, condition: QuestCondition, user: IUser): Promise<number | null> => {
	const { type } = condition

	if (type === QuestConditionType.ProvideLiquidity) {
		const lastUserDeposit = await getLastDeposit(user.address as Address)

		if (!lastUserDeposit) {
			return null
		}

		const amount = formatUnits(lastUserDeposit.args.usdcAmount, 6)
		const points = Number(amount) * 0.05

		const passedQuest = {
			id: quest._id,
			points,
			date: new Date().valueOf(),
		}

		await updateUser(user._id, {
			passedQuests: [...user.passedQuests, passedQuest],
			points: user.points + points,
		})

		return points
	}

	return null
}
