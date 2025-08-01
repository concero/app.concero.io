import cls from './DailyTaskList.module.pcss'
import { useAccount } from 'wagmi'
import { useUserByAddress } from '@/entities/User'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
import { useAllQuests } from '@/entities/Quest'
export const DailyTaskList = (): JSX.Element => {
	const { data: quests } = useAllQuests()
	const account = useAccount()
	const { data: user } = useUserByAddress(account.address)
	//TODO: remove checking admin
	const DailyQuests = quests?.quests
		?.filter(q => q.interval == 'daily')
		.toSorted((a, b) => {
			return b.index - a.index
		})
	if (!quests || !DailyQuests) {
		return <></>
	}
	return (
		<div className={cls.daily_tasks}>
			<span className={cls.title}>Daily tasks</span>
			<div className={cls.list}>
				{DailyQuests.map(quest => {
					return (
						<QuestPreviewItem
							quest={quest}
							user={user}
							key={quest.id}
							size="s"
							className={cls.preview_item}
						/>
					)
				})}
			</div>
		</div>
	)
}
