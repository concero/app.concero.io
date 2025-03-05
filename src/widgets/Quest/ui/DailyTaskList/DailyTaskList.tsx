import { useQuests } from '@/entities/Quest'
import cls from './DailyTaskList.module.pcss'
import { useAccount } from 'wagmi'
import { useUserByAddress } from '@/entities/User'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
export const DailyTaskList = (): JSX.Element => {
	const { data: quests } = useQuests()
	const account = useAccount()
	const { data: user } = useUserByAddress(account.address)
	if (!quests?.Daily) {
		return <></>
	}
	return (
		<div className={cls.daily_tasks}>
			<span className={cls.title}>Daily tasks</span>
			<div className={cls.list}>
				{quests.Daily.map(quest => {
					return <QuestPreviewItem quest={quest} user={user} key={quest._id} size="s" />
				})}
			</div>
		</div>
	)
}
