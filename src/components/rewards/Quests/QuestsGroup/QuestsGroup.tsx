import classNames from './QuestsGroup.module.pcss'
import { useEffect, useState, useCallback } from 'react'
import { type IQuest } from '../../../../api/concero/quest/questType'
import { fetchQuests, type GroupedQuests } from '../../../../api/concero/quest/fetchQuests'
import type { IUser } from '../../../../api/concero/user/userType'
import { QuestCard } from '../QuestCard/QuestCard'
import { QuestPlaceholder } from '../QuestPlaceholder/questplaceholder'
import { useAccount } from 'wagmi'

interface QuestsCardProps {
	user: IUser | null | undefined
}

export const QuestsGroup = ({ user }: QuestsCardProps) => {
	const { address } = useAccount()
	const [quests, setQuests] = useState<GroupedQuests | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const handleGetQuests = useCallback(async () => {
		const fetchedQuests = await fetchQuests()
		setQuests(fetchedQuests)

		setIsLoading(false)
	}, [user, address])

	useEffect(() => {
		void handleGetQuests()
	}, [handleGetQuests])

	const renderQuestCards = (
		quests: IQuest[] | undefined,
		variant: 'big' | 'normal' | 'small',
		className?: string,
	) => {
		if (!quests && !isLoading) return null

		return isLoading ? (
			<>
				<QuestPlaceholder variant={variant} className={className} />
				<QuestPlaceholder variant={variant} className={className} />
			</>
		) : (
			quests!.map((quest: IQuest) => (
				<QuestCard key={quest._id} quest={quest} user={user} variant={variant} className={className} />
			))
		)
	}

	return (
		<div className="gap-xxl">
			{quests?.Campaign?.map(quest => {
				return (
					<QuestCard
						className={classNames.campaign}
						quest={quest}
						user={user}
						variant="big"
						key={quest._id}
					/>
				)
			})}

			{(isLoading || quests?.Daily) && (
				<div className="gap-sm">
					<div className={classNames.questsHeader}>
						<h6>Daily</h6>
					</div>
					<div className={classNames.dailyQuests}>{renderQuestCards(quests?.Daily, 'small')}</div>
				</div>
			)}

			<div>
				<div className={classNames.questsHeader}>
					<h6>Quests</h6>
				</div>

				<div className={classNames.monthlyQuests}>
					{renderQuestCards(quests?.Big, 'big', classNames.campaign)}
				</div>

				{(isLoading || quests?.Primary || quests?.Secondary) && (
					<div className="gap-lg">
						<div className={classNames.otherQuestsWrap}>
							<div className={classNames.smallCardsContainer}>
								{renderQuestCards(quests?.Primary, 'big')}
							</div>
							<div className={classNames.smallCardsContainer}>
								{renderQuestCards(quests?.Secondary, 'normal')}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
