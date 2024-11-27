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
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const handleGetQuests = async () => {
		let userQuestActions: IUserAction[] = []

		if (!user && !address) {
			const fetchedQuests = await fetchQuests()
			setQuests(fetchedQuests)
			setIsLoading(false)
			return
		}

		if (!user) return

		userQuestActions = await fetchUserQuestActions(user.address)
		const fetchedQuests = await fetchQuests()

		const newQuests = fetchedQuests.map(quest => {
			const userAction = userQuestActions.find(action => {
				return action.documentId.toLocaleLowerCase() === quest._id.toLocaleLowerCase()
			})
			return { ...quest, userAction }
		})

		setQuests(newQuests)
		setIsLoading(false)
	}

	useEffect(() => {
		void handleGetQuests()
		console.log(isLoading, 'Is the data loading?')
	}, [user])

	const campaignQuest = quests.find((quest: IQuest) => quest.type === QuestType.Campaign)
	const dailyQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Daily)
	const monthlyQuests = quests.filter(
		(quest: IQuest) => quest.type === QuestType.Monthly || quest.type === QuestType.Big,
	)
	const primaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Primary)
	const secondaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Secondary)

	return (
		<div className="gap-xxl">
			{campaignQuest && (
				<QuestCard
					className={classNames.campaign}
					quest={campaignQuest}
					user={user}
					variant="big"
					isLoading={isLoading}
				/>
			)}

			{dailyQuests.length > 0 && (
				<div className="gap-sm">
					<div className={classNames.questsHeader}>
						<h6>Daily</h6>
					</div>
					<div className={classNames.dailyQuests}>
						{dailyQuests.map((quest: IQuest) => (
							<QuestCard
								key={quest._id}
								quest={quest}
								user={user}
								variant="small"
								isLoading={isLoading}
							/>
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
							isLoading={isLoading}
						/>
					))}
				</div>

				{quests.length > 0 && (
					<div className="gap-lg">
						<div className={classNames.otherQuestsWrap}>
							<div className={classNames.smallCardsContainer}>
								{primaryQuests.map((quest: IQuest) => (
									<QuestCard
										key={quest._id}
										quest={quest}
										user={user}
										variant="big"
										isLoading={isLoading}
									/>
								))}
							</div>
							<div className={classNames.smallCardsContainer}>
								{secondaryQuests.map((quest: IQuest) => (
									<QuestCard
										key={quest._id}
										quest={quest}
										user={user}
										variant="normal"
										isLoading={isLoading}
									/>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
