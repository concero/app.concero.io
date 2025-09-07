import cls from './DailyTaskList.module.pcss'
import { useAccount } from 'wagmi'
import { useAllQuests, useUserQuests } from '@/entities/Quest'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
export const DailyTaskList = (): JSX.Element => {
	const { data: quests } = useAllQuests()
	const { address } = useAccount()

	const { data: userQuests } = useUserQuests({
		address,
		quest_instance_ids: quests?.quests.map(quest => quest.quest_instance_id),
		skip: 0,
		take: 50,
	})
	//TODO: remove checking admin
	const dailyQuests = quests?.quests
		?.filter(q => q.interval == 'daily')
		.toSorted((a, b) => {
			return b.sort_index - a.sort_index
		})
	if (!quests || !dailyQuests) {
		return <></>
	}

	return (
		<div className={cls.daily_tasks}>
			<span className={cls.title}>Daily tasks</span>
			<div className={cls.list}>
				{dailyQuests.map(quest => {
					let userQuest = undefined

					if (userQuests?.payload?.userQuests && userQuests?.payload?.userQuests.length) {
						userQuest = userQuests?.payload?.userQuests.find(
							userQuest => userQuest.questInstanceId === quest.quest_instance_id,
						)
					}
					return (
						<QuestPreviewItem
							quest={quest}
							userQuest={userQuest}
							key={quest.id}
							className={cls.preview_item}
						/>
					)
				})}
			</div>
		</div>
	)
}
