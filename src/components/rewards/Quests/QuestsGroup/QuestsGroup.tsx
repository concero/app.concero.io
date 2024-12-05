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
	const { address, isConnected } = useAccount()
	const [quests, setQuests] = useState<GroupedQuests | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const handleGetQuests = useCallback(async () => {
		if (!user && isConnected) return
		const fetchedQuests = await fetchQuests()
		setQuests(fetchedQuests)

		setIsLoading(false)
	}, [address])

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
			{!isLoading &&
				quests?.Campaign?.map((quest: IQuest) => (
					<QuestCard key={quest._id} quest={quest} user={user} variant={'big'} />
				))}

			<div className="gap-sm">
				<div className={classNames.questsHeader}>
					<h6>Daily</h6>
				</div>
				<div className={classNames.dailyQuests}>{renderQuestCards(quests?.Daily, 'small')}</div>
			</div>

			<div>
				<div className={classNames.questsHeader}>
					<h6>Quests</h6>
				</div>

				<div className={classNames.monthlyQuests}>
					{renderQuestCards(quests?.Monthly, 'big', classNames.campaign)}
				</div>

				<div className="gap-lg">
					<div className={classNames.otherQuestsWrap}>
						<div className={classNames.smallCardsContainer}>{renderQuestCards(quests?.Primary, 'big')}</div>
						<div className={classNames.smallCardsContainer}>
							{renderQuestCards(quests?.Secondary, 'normal')}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
