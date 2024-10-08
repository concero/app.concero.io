import classNames from './QuestsGroup.module.pcss'
import { useEffect, useState } from 'react'
import { type IQuest, QuestType } from '../../../../api/concero/quest/questType'
import { fetchQuests } from '../../../../api/concero/quest/fetchQuests'
import type { IUser } from '../../../../api/concero/user/userType'
import { QuestCard } from '../QuestCard/QuestCard'
import { type IUserAction } from '../../../../api/concero/userActions/userActionType'
import { fetchUserQuestActions } from '../../../../api/concero/userActions/fetchUserQuestActions'

interface QuestsCardProps {
	user: IUser | null | undefined
}

export const QuestsGroup = ({ user }: QuestsCardProps) => {
	const [quests, setQuests] = useState<IQuest[]>([])

	const handleGetQuests = async () => {
		let userQuestActions: IUserAction[] = []
		if (user) {
			userQuestActions = await fetchUserQuestActions(user.address)
		}
		const fetchedQuests = await fetchQuests()

		const newQuests = fetchedQuests.map(quest => {
			const userAction = userQuestActions.find(action => {
				return action.documentId.toLocaleLowerCase() === quest._id.toLocaleLowerCase()
			})
			return { ...quest, userAction }
		})

		setQuests(newQuests)
	}

	useEffect(() => {
		void handleGetQuests()
	}, [user])

	const campaignQuest = quests.find((quest: IQuest) => quest.type === QuestType.Campaign)
	const dailyQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Daily)
	const primaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Primary)
	const secondaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Secondary)

	return (
		<div className="gap-xxl">
			{campaignQuest && (
				<QuestCard className={classNames.campaign} quest={campaignQuest} user={user} variant="big" />
			)}

			{dailyQuests.length > 0 && (
				<div className="gap-md">
					<div className={classNames.questsHeader}>
						<h6>Daily quests</h6>
					</div>
					<div className={classNames.dailyQuests}>
						{dailyQuests.map((quest: IQuest) => (
							<QuestCard key={quest._id} quest={quest} user={user} variant="small" />
						))}
					</div>
				</div>
			)}

			{quests.length > 0 && (
				<div className="gap-sm">
					<div className={classNames.questsHeader}>
						<h6>Weekly quests</h6>
					</div>
					<div className={classNames.otherQuestsWrap}>
						<div className={classNames.smallCardsContainer}>
							{primaryQuests.map((quest: IQuest) => (
								<QuestCard key={quest._id} quest={quest} user={user} variant="big" />
							))}
						</div>
						<div className={classNames.smallCardsContainer}>
							{secondaryQuests.map((quest: IQuest) => (
								<QuestCard key={quest._id} quest={quest} user={user} variant="normal" />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
