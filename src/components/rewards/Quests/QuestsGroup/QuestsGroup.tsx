import classNames from './QuestsGroup.module.pcss'
import { useEffect, useState } from 'react'
import { type IQuest } from '../../../../api/concero/quest/questType'
import { fetchQuests } from '../../../../api/concero/quest/fetchQuests'
import type { IUser } from '../../../../api/concero/user/userType'
import { QuestCard } from '../QuestCard/QuestCard'
import { Button } from '../../../buttons/Button/Button'
import { PlusIcon } from '../../../../assets/icons/PlusIcon'

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
		<div className="gap-xxl">
			{quests[0] && <QuestCard className={classNames.campaign} quest={quests[0]} user={user} variant="big" />}

			<div className="gap-md">
				<div className={classNames.questsHeader}>
					<h6>Daily</h6>
				</div>
				<div className={classNames.dailyQuests}>
					{quests[0] && <QuestCard quest={quests[0]} user={user} variant="small" />}
					{quests[1] && <QuestCard quest={quests[1]} user={user} variant="small" />}
					{quests[2] && <QuestCard quest={quests[2]} user={user} variant="small" />}
				</div>
			</div>

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
						{quests[2] && <QuestCard quest={quests[2]} user={user} variant="normal" />}
						{quests[3] && <QuestCard quest={quests[3]} user={user} variant="normal" />}
					</div>
				</div>
				<div className={classNames.loadMoreWrap}>
					<Button size="sm" variant="tetrary" leftIcon={<PlusIcon />}>
						Load more
					</Button>
				</div>
			</div>
		</div>
	)
}
