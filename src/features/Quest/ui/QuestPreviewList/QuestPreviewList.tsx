import { useAccount } from 'wagmi'
import { useQuests } from '@/entities/Quest'
import { useUserByAddress } from '@/entities/User'
import { Button } from '@/components/buttons/Button/Button'
import cls from './QuestPreviewList.module.pcss'
import { QuestPreviewItem } from '../QuestPreviewItem/QuestPreviewItem'

export const QuestPreviewList = (): JSX.Element => {
	const { data: quests } = useQuests()
	const account = useAccount()
	const { data: user } = useUserByAddress(account.address)
	return (
		<div className={cls.quest_preview_list}>
			<div className={cls.title}>Quests</div>
			<div className={cls.filters}>
				<Button variant="secondaryColor" size="md">
					On Chain
				</Button>
				<Button variant="secondary" size="md">
					Testing
				</Button>
			</div>
			<div className={cls.list}>
				<div className={cls.monthly}>
					{quests?.Monthly.map(quest => (
						<QuestPreviewItem quest={quest} user={user} key={quest._id} size="xl" />
					))}
				</div>
				<div className={cls.primary}>
					{quests?.Primary.map(quest => (
						<QuestPreviewItem quest={quest} user={user} key={quest._id} size="l" />
					))}
				</div>
				<div className={cls.secondary}>
					{quests?.Secondary.map(quest => (
						<QuestPreviewItem quest={quest} user={user} key={quest._id} size="m" />
					))}
				</div>
			</div>
		</div>
	)
}
