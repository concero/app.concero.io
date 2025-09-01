import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { TUserQuest, useAllQuests, useUserQuests } from '@/entities/Quest'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
import cls from './QuestPreviewList.module.pcss'
import clsx from 'clsx'
import { HStack } from '@/shared/ui/Stack'
import { TQuestGroup } from '@/entities/Quest'
import { useQuestPreviewList } from '../../model/hooks/useQuestPreviewList'

type TProps = {
	groups: TQuestGroup[]
}

export const QuestPreviewList = (props: TProps): JSX.Element => {
	const { groups } = props

	const { quest_size_xl, quest_size_l, quest_size_m, questInstanceId_userQuest_map } = useQuestPreviewList({ groups })
	return (
		<div className={cls.quest_preview_list}>
			{
				// TODO: Improve this component, separate UI and Logic
				groups.includes('rewards') && (
					<div className={cls.header_list}>
						<div className={cls.title}>Quests</div>
					</div>
				)
			}
			<div className={cls.list}>
				{quest_size_xl?.map(quest => (
					<QuestPreviewItem
						quest={quest}
						key={quest.id}
						userQuest={questInstanceId_userQuest_map[quest.questInstanceId]}
						className={clsx(cls.preview_item, cls.size_xl)}
					/>
				))}
				{quest_size_l?.map(quest => (
					<QuestPreviewItem
						quest={quest}
						key={quest.id}
						userQuest={questInstanceId_userQuest_map[quest.questInstanceId]}
						className={clsx(cls.preview_item, cls.size_l)}
					/>
				))}
				{quest_size_l?.map(quest => (
					<QuestPreviewItem
						quest={quest}
						key={quest.id}
						userQuest={questInstanceId_userQuest_map[quest.questInstanceId]}
						className={clsx(cls.preview_item, cls.size_l)}
					/>
				))}
				{quest_size_l?.map(quest => (
					<QuestPreviewItem
						quest={quest}
						key={quest.id}
						userQuest={questInstanceId_userQuest_map[quest.questInstanceId]}
						className={clsx(cls.preview_item, cls.size_l)}
					/>
				))}
			</div>
			<HStack gap="16px" wrap="wrap">
				{quest_size_m?.map(quest => (
					<QuestPreviewItem
						quest={quest}
						key={quest.id}
						userQuest={questInstanceId_userQuest_map[quest.questInstanceId]}
						className={clsx(cls.preview_item, cls.size_m)}
					/>
				))}
			</HStack>
		</div>
	)
}
