import { useMemo, useState } from 'react'
import { Button, useTheme } from '@concero/ui-kit'
import { useAccount } from 'wagmi'
import { TQuestTag, TUserQuest, useAllQuests, useUserQuests } from '@/entities/Quest'
import { useUserByAddress } from '@/entities/User'
import TestingPortalLightImage from '@/shared/assets/icons/light_testing_portal_rocket.png'
import TestingPortalDarkImage from '@/shared/assets/icons/dark_testing_portal_rocket.png'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
import cls from './QuestPreviewList.module.pcss'

type WithoutUndefined<T> = T extends undefined ? never : T

export const QuestPreviewList = (): JSX.Element => {
	const { data: questsWrap, isFetching } = useAllQuests()
	const { address } = useAccount()
	const { theme } = useTheme()
	const quest_instance_ids = questsWrap?.quests.map(quest => quest.quest_instance_id)
	const { data: userQuestsResponse } = useUserQuests({ address, quest_instance_ids, skip: 0, take: 50 })
	const [viewMode, setViewMode] = useState<WithoutUndefined<TQuestTag>>('rewards')

	const handleViewModeChange = (mode: 'rewards' | 'testing') => {
		setViewMode(mode)
	}

	// groupByView
	const quests = questsWrap?.quests

	const groupedQuests = useMemo(
		() => quests?.filter(q => (q.group ? q.group === viewMode : viewMode === 'rewards')),
		[viewMode, isFetching],
	)
	const quest_size_m = useMemo(() => {
		return groupedQuests?.filter(q => q.size === 'm').toSorted((a, b) => (b.sort_index || 0) - (a.sort_index || 0))
	}, [isFetching, groupedQuests])
	const quest_size_l = useMemo(() => {
		return groupedQuests?.filter(q => q.size === 'l').toSorted((a, b) => (b.sort_index || 0) - (a.sort_index || 0))
	}, [isFetching, groupedQuests])

	const quest_size_xl = useMemo(() => {
		return groupedQuests
			?.filter(q => q.size === 'xl')
			.toSorted((a, b) => {
				return (b.sort_index || 0) - (a.sort_index || 0)
			})
	}, [isFetching, groupedQuests])

	const questInstanceId_userQuest_map: Record<string, TUserQuest> = userQuestsResponse?.payload.userQuests
		? userQuestsResponse.payload.userQuests.reduce(
				(sum, userQuest) => ({ ...sum, [userQuest.questInstanceId]: userQuest }),
				{} as Record<string, TUserQuest>,
			)
		: {}

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
								key={quest.id}
								userQuest={questInstanceId_userQuest_map[quest.quest_instance_id]}
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
								key={quest.id}
								userQuest={questInstanceId_userQuest_map[quest.quest_instance_id]}
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
								key={quest.id}
								userQuest={questInstanceId_userQuest_map[quest.quest_instance_id]}
								className={cls.preview_item}
							/>
						))}
					</div>
				) : null}
			</div>
		</div>
	)
}
