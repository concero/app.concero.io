import cls from './DailyTaskList.module.pcss'
import { useAccount } from 'wagmi'
import { useUserByAddress } from '@/entities/User'
import { useAllQuests, useUserQuests } from '@/entities/Quest'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
export const DailyTaskList = (): JSX.Element => {
	const { data: quests } = useAllQuests()
	const { address } = useAccount()
	const { data: user } = useUserByAddress(address)
	const { data: userQuests } = useUserQuests({
		address,
		quest_ids: quests?.quests.map(quest => quest.id),
		skip: 0,
		take: 50,
	})
	//TODO: remove checking admin
	const DailyQuests = quests?.quests
		?.filter(q => q.interval == 'daily')
		.toSorted((a, b) => {
			return b.sort_index - a.sort_index
		})
	if (!quests || !DailyQuests || !user?.payload) {
		return <></>
	}
	return (
		<div className={cls.daily_tasks}>
			<span className={cls.title}>Daily tasks</span>
			<div className={cls.list}>
				{DailyQuests.map(quest => {
					const userQuest = userQuests?.payload.userQuests.find(userQuest => userQuest.questId === quest.id)
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
