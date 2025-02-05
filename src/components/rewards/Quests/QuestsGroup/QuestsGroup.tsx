import classNames from './QuestsGroup.module.pcss'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { type IQuest } from '../../../../api/concero/quest/questType'
import { fetchQuests, type GroupedQuests } from '../../../../api/concero/quest/fetchQuests'
import type { IUser } from '../../../../api/concero/user/userType'
import { QuestCard } from '../QuestCard/QuestCard'
import { QuestPlaceholder } from '../QuestPlaceholder/questplaceholder'
import { useAccount, useSignMessage } from 'wagmi'

interface QuestsCardProps {
	user: IUser | null | undefined
}

const LoadingPlaceholders = ({ variant, className }: { variant: 'big' | 'normal' | 'small'; className?: string }) => (
	<>
		<QuestPlaceholder variant={variant} className={className} />
		<QuestPlaceholder variant={variant} className={className} />
	</>
)

export const QuestsGroup = ({ user }: QuestsCardProps) => {
	const { address } = useAccount()
	const [quests, setQuests] = useState<GroupedQuests | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const memoizedUser = useMemo(() => user, [user?._id])
	const memoizedQuests = useMemo(() => quests, [quests === null])

	const handleGetQuests = useCallback(async () => {
		fetchQuests()
			.then(fetchedQuests => {
				setQuests(fetchedQuests)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [address])

	useEffect(() => {
		void handleGetQuests()
	}, [handleGetQuests])

	const renderQuestCards = useCallback(
		(quests: IQuest[] | undefined, variant: 'big' | 'normal' | 'small', className?: string) => {
			if (!quests && !isLoading) return null

			if (isLoading) {
				return <LoadingPlaceholders variant={variant} className={className} />
			}

			return quests?.map((quest: IQuest) => (
				<QuestCard key={quest._id} quest={quest} user={memoizedUser} variant={variant} className={className} />
			))
		},
		[isLoading, memoizedUser],
	)

	const campaignQuests = useMemo(() => {
		if (isLoading || !memoizedQuests?.Campaign) return null
		return memoizedQuests.Campaign.map((quest: IQuest) => (
			<QuestCard key={quest._id} quest={quest} user={memoizedUser} variant={'big'} />
		))
	}, [isLoading, memoizedQuests?.Campaign, memoizedUser])

	return (
		<div className="gap-xxl">
			{campaignQuests}

			<div className="gap-sm">
				<div className={classNames.questsHeader}>
					<h6>Daily</h6>
				</div>
				<div className={classNames.dailyQuests}>{renderQuestCards(memoizedQuests?.Daily, 'small')}</div>
			</div>

			<div>
				<div className={classNames.questsHeader}>
					<h6>Quests</h6>
				</div>

				<div className={classNames.monthlyQuests}>
					{renderQuestCards(memoizedQuests?.Monthly, 'big', classNames.campaign)}
				</div>

				<div className="gap-lg">
					<div className={classNames.otherQuestsWrap}>
						<div className={classNames.smallCardsContainer}>
							{renderQuestCards(memoizedQuests?.Primary, 'big')}
						</div>
						<div className={classNames.smallCardsContainer}>
							{renderQuestCards(memoizedQuests?.Secondary, 'normal')}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
