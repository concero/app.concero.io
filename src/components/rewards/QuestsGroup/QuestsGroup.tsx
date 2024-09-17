import classNames from './QuestsGroup.module.pcss'
import { useEffect, useState } from 'react'
import { type IQuest } from '../../../api/concero/quest/questType'
import { fetchQuests } from '../../../api/concero/quest/fetchQuests'
import type { IUser } from '../../../api/concero/user/userType'
import { QuestCard } from '../QuestCard/QuestCard'

interface QuestsCardProps {
	user: IUser | null | undefined
}
export const QuestsGroup = ({ user }: QuestsCardProps) => {
	const [quests, setQuests] = useState<IQuest[]>([])

	const handleFetchQuests = async () => {
		const list = await fetchQuests()
		setQuests(list)
	}

	useEffect(() => {
		void handleFetchQuests()
	}, [])

	return (
		<div className="gap-md">
			<div className={classNames.questsHeader}>
				<h6>Quests</h6>
			</div>
			<div className={classNames.otherQuestsWrap}>
				<div className={classNames.smallCardsContainer}>
					{quests[0] && <QuestCard quest={quests[0]} user={user} variant="big" />}
					{quests[1] && <QuestCard quest={quests[1]} user={user} variant="big" />}
				</div>
				<div className={classNames.smallCardsContainer}>
					{quests[2] && <QuestCard quest={quests[2]} user={user} variant="big" />}
					{quests[3] && <QuestCard quest={quests[3]} user={user} variant="big" />}
				</div>
			</div>
		</div>
	)
}
