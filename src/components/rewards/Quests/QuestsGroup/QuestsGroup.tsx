import classNames from './QuestsGroup.module.pcss'
import { useEffect, useState } from 'react'
import { type IQuest, QuestType } from '../../../../api/concero/quest/questType'
import { fetchQuests } from '../../../../api/concero/quest/fetchQuests'
import type { IUser } from '../../../../api/concero/user/userType'
import { QuestCard } from '../QuestCard/QuestCard'
import { type IUserAction } from '../../../../api/concero/userActions/userActionType'
import { fetchUserQuestActions } from '../../../../api/concero/userActions/fetchUserQuestActions'
import { useAccount } from 'wagmi'

interface QuestsCardProps {
	user: IUser | null | undefined
}

export const QuestsGroup = ({ user }: QuestsCardProps) => {
	const { address } = useAccount()
	const [quests, setQuests] = useState<IQuest[]>([])

	const handleGetQuests = async () => {
		let userQuestActions: IUserAction[] = []

		// todo: calling fetchQuests twice
		if (!user && !address) {
			setQuests(await fetchQuests())
		}

		if (!user) return

		// todo: promise.all
		userQuestActions = await fetchUserQuestActions(user.address)
		const fetchedQuests = await fetchQuests()

		// todo: what is this used for?
		const newQuests = fetchedQuests.map(quest => {
			const userAction = userQuestActions.find(action => {
				return action.documentId.toLocaleLowerCase() === quest._id.toLocaleLowerCase()
			})
			return { ...quest, userAction }
		})

		setQuests(newQuests)
	}

	useEffect(() => {
		// todo: this should not be named a handle as its not connected to a button
		void handleGetQuests()
	}, [user])

	// todo: let's send sorted data from BE and not use filters and finds on the frontend
	const campaignQuest = quests.find((quest: IQuest) => quest.type === QuestType.Campaign)
	const dailyQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Daily)
	const monthlyQuests = quests.filter(
		(quest: IQuest) => quest.type === QuestType.Monthly || quest.type === QuestType.Big,
	)
	const primaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Primary)
	const secondaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Secondary)

	// todo: we have dailyQuests, therefore quests should be renamed
	return (
		<div className="gap-xxl">
			{campaignQuest && (
				<QuestCard className={classNames.campaign} quest={campaignQuest} user={user} variant="big" />
			)}

			{dailyQuests.length > 0 && (
				<div className="gap-sm">
					<div className={classNames.questsHeader}>
						<h6>Daily</h6>
					</div>
					<div className={classNames.dailyQuests}>
						{dailyQuests.map((quest: IQuest) => (
							<QuestCard key={quest._id} quest={quest} user={user} variant="small" />
						))}
					</div>
				</div>
			)}

			<div>
				<div className={classNames.questsHeader}>
					<h6>Quests</h6>
				</div>

				<div className={classNames.monthlyQuests}>
					{monthlyQuests.map((quest: IQuest) => (
						<QuestCard
							key={quest._id}
							className={classNames.campaign}
							quest={quest}
							user={user}
							variant="big"
						/>
					))}
				</div>

				{quests.length > 0 && (
					<div className="gap-lg">
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
		</div>
	)
}
