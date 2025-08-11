import { useMemo, useState } from 'react'
import { Button, useTheme } from '@concero/ui-kit'
import { useAccount } from 'wagmi'
import { TQuestTag, TQuestSize, TQuestType, useAllQuests } from '@/entities/Quest'
import { useUserByAddress } from '@/entities/User'
import TestingPortalLightImage from '@/shared/assets/icons/light_testing_portal_rocket.png'
import TestingPortalDarkImage from '@/shared/assets/icons/dark_testing_portal_rocket.png'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
import cls from './QuestPreviewList.module.pcss'

type WithoutUndefined<T> = T extends undefined ? never : T

export const QuestPreviewList = (): JSX.Element => {
	const { data: quests, isFetching } = useAllQuests()
	const account = useAccount()
	const { theme } = useTheme()
	const { data: user } = useUserByAddress(account.address)
	const [viewMode, setViewMode] = useState<WithoutUndefined<TQuestTag>>('testing')

	// let isShowQuests = true
	// if (viewMode === 'rewards') {
	// 	isShowQuests = false
	// 	if (user) {
	// 	}
	// }
	const handleViewModeChange = (mode: 'rewards' | 'testing') => {
		setViewMode(mode)
	}
	const sizeMap: Record<TQuestType, TQuestSize> = {
		Big: 'xl',
		Campaign: 'xl',
		Daily: 's',
		Monthly: 'xl',
		Primary: 'l',
		Secondary: 'm',
	}
	// groupByView
	const groupedQuests = useMemo(
		() =>
			quests?.filter(q => {
				if (q?.tag === 'rewards') {
					if (user) {
						const isQuestInProgress = user.questsInProgress.some(
							questInProgress => questInProgress.questId === q._id,
						)
						return isQuestInProgress
					} else {
						return false
					}
				}
				return q?.tag ? q.tag === viewMode : viewMode === 'rewards'
			}),
		[viewMode, user, isFetching],
	)
	const quest_size_m = useMemo(() => {
		return groupedQuests
			?.filter(q => (q.size ? q.size === 'm' : sizeMap[q.type] == 'm'))
			.toSorted((a, b) => (b?.priority || 0) - (a?.priority || 0))
	}, [isFetching, groupedQuests])
	const quest_size_l = useMemo(() => {
		return groupedQuests
			?.filter(q => (q.size ? q.size === 'l' : sizeMap[q.type] == 'l'))
			.toSorted((a, b) => (b?.priority || 0) - (a?.priority || 0))
	}, [isFetching, groupedQuests])
	const quest_size_xl = useMemo(() => {
		return groupedQuests
			?.filter(q => (q.size ? q.size === 'xl' : sizeMap[q.type] == 'xl'))
			.toSorted((a, b) => {
				return (b?.priority || 0) - (a?.priority || 0)
			})
	}, [isFetching, groupedQuests])

	return (
		<div className={cls.quest_preview_list}>
			<div className={cls.header_list}>
				<div className={cls.title}>Quests</div>
				<div className={cls.filters}>
					<Button
						variant={viewMode == 'rewards' ? 'secondary_color' : 'secondary'}
						size="m"
						onClick={() => handleViewModeChange('rewards')}
						className={viewMode == 'rewards' ? cls.selected : ''}
					>
						Rewards
					</Button>
					<Button
						variant={viewMode == 'testing' ? 'secondary_color' : 'secondary'}
						size="m"
						onClick={() => handleViewModeChange('testing')}
						className={viewMode == 'testing' ? cls.selected : ''}
					>
						Testing
					</Button>
				</div>
			</div>
			{viewMode === 'testing' ? (
				<div className={cls.testing_start_block}>
					<img
						src={theme === 'light' ? TestingPortalLightImage : TestingPortalDarkImage}
						alt="Rocket of testing portal"
					/>
					<div className={cls.description_block}>
						<div className={cls.title}>Welcome to the Testing Portal!</div>
						<div className={cls.subtitle}>
							Participate in surveys about products built on our protocol and earn rewards. Your feedback
							improves these products and supports their growth.
						</div>
					</div>
				</div>
			) : null}
			<div className={cls.list}>
				{quest_size_xl ? (
					<div className={cls.size_xl}>
						{quest_size_xl.map(quest => (
							<QuestPreviewItem
								quest={quest}
								user={user}
								key={quest._id}
								size="xl"
								className={cls.preview_item}
							/>
						))}
					</div>
				) : null}
				{quest_size_l ? (
					<div className={cls.size_l}>
						{quest_size_l.map(quest => (
							<QuestPreviewItem
								quest={quest}
								user={user}
								key={quest._id}
								size="l"
								className={cls.preview_item}
							/>
						))}
					</div>
				) : null}
				{quest_size_m ? (
					<div className={cls.size_m}>
						{quest_size_m.map(quest => (
							<QuestPreviewItem
								quest={quest}
								user={user}
								key={quest._id}
								size="m"
								className={cls.preview_item}
							/>
						))}
					</div>
				) : null}
			</div>
		</div>
	)
}
