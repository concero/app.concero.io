import classNames from './QuestsGroup.module.pcss'
import { useEffect, useState, useCallback } from 'react'
import { type IQuest, QuestType } from '../../../../api/concero/quest/questType'
import { fetchQuests } from '../../../../api/concero/quest/fetchQuests'
import type { IUser } from '../../../../api/concero/user/userType'
import { QuestCard } from '../QuestCard/QuestCard'
import { QuestPlaceholder } from '../QuestPlaceholder/questplaceholder'
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

	const handleGetQuests = useCallback(async () => {
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
	}, [user, address])

	useEffect(() => {
		void handleGetQuests()
	}, [handleGetQuests])

	const campaignQuest = quests.find((quest: IQuest) => quest.type === QuestType.Campaign)
	const dailyQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Daily)
	const monthlyQuests = quests.filter(
		(quest: IQuest) => quest.type === QuestType.Monthly || quest.type === QuestType.Big,
	)
	const primaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Primary)
	const secondaryQuests = quests.filter((quest: IQuest) => quest.type === QuestType.Secondary)

	const renderQuestCards = (quests: IQuest[], variant: 'big' | 'normal' | 'small', className?: string) =>
		isLoading ? (
			<>
				<QuestPlaceholder variant={variant} className={className} />
				<QuestPlaceholder variant={variant} className={className} />
			</>
		) : (
			quests.map((quest: IQuest) => (
				<QuestCard key={quest._id} quest={quest} user={user} variant={variant} className={className} />
			))
		)

	return (
		<div className="gap-xxl">
			{campaignQuest && (
				<QuestCard className={classNames.campaign} quest={campaignQuest} user={user} variant="big" />
			)}

			{(isLoading || dailyQuests.length > 0) && (
				<div className="gap-sm">
					<div className={classNames.questsHeader}>
						<h6>Daily</h6>
					</div>
					<div className={classNames.dailyQuests}>{renderQuestCards(dailyQuests, 'small')}</div>
				</div>
			)}

			<div>
				<div className={classNames.questsHeader}>
					<h6>Quests</h6>
				</div>

				<div className={classNames.monthlyQuests}>
					{renderQuestCards(monthlyQuests, 'big', classNames.campaign)}
				</div>

				{(isLoading || quests.length > 0) && (
					<div className="gap-lg">
						<div className={classNames.otherQuestsWrap}>
							<div className={classNames.smallCardsContainer}>
								{renderQuestCards(primaryQuests, 'big')}
							</div>
							<div className={classNames.smallCardsContainer}>
								{renderQuestCards(secondaryQuests, 'normal')}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
