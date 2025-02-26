import { useQuests } from '@/entities/Quest'
import cls from './DailyTaskList.module.pcss'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'
import { useAccount } from 'wagmi'
import { useUserByAddress } from '@/entities/User'
export const DailyTaskList = (): JSX.Element => {
	const { data: quests, isPending } = useQuests()
	const account = useAccount()
	const { data: user } = useUserByAddress(account.address)
	return (
		<div className={cls.daily_tasks}>
			<span className={cls.title}>Daily tasks</span>
			<div className={cls.list}>
				{quests?.Daily.map(quest => <QuestPreviewItem quest={quest} user={user} key={quest._id} size="s" />)}
			</div>
		</div>
	)
}
