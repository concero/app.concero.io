import classNames from './QuestsCard.module.pcss'
import { Card } from '../Card/Card'
import { Tag } from '../../tags/Tag/Tag'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Button } from '../../buttons/Button/Button'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getQuestStatus, QuestStatus } from './getQuestStatus'
import { UserHistory } from '../../modals/RewardsUserHistory/RewardsUserHistory'
import { type IQuest } from '../../../api/concero/quest/questType'
import { fetchQuests } from '../../../api/concero/quest/fetchQuests'
import { QuestModal } from '../../modals/QuestModal/QuestModal'
import type { IUser } from '../../../api/concero/user/userType'

interface QuestCardProps {
	variant?: 'big' | 'normal' | 'small'
	quest: IQuest
	user: IUser | null | undefined
}

interface QuestsCardProps {
	user: IUser | null | undefined
}

const QuestCard = ({ variant = 'big', quest, user }: QuestCardProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const { name, startDate, endDate, image } = quest

	const { status, typeStatus } = getQuestStatus(startDate, endDate)

	const imgWidth = variant === 'big' ? 124 : 115
	const imgHeight = variant === 'big' ? 163 : 143

	const questImage = quest.image ? (
		<img className={classNames.questImage} width={imgWidth} height={imgHeight} src={image} alt="Quest image" />
	) : null

	return (
		<>
			<div
				className={classNames.questCard}
				onClick={() => {
					setIsOpen(true)
				}}
			>
				<Card className={`row jsb h-full ${variant === 'small' ? 'ac' : ''}`} key={variant}>
					<div className="jsb h-full gap-md">
						<Tag size="sm" color={typeStatus === QuestStatus.LAUNCH ? 'pink' : 'blue'}>
							{status}
						</Tag>
						{variant === 'big' ? <h2>{name}</h2> : <h4>{name}</h4>}
					</div>
					{variant === 'small' ? (
						<IconArrowUpRight width={33} height={33} stroke={2} color={'var(--color-primary-650)'} />
					) : (
						questImage
					)}
				</Card>
			</div>
			<QuestModal
				user={user}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				quest={quest}
				status={status}
				typeStatus={typeStatus}
			/>
		</>
	)
}

export const QuestsCard = ({ user }: QuestsCardProps) => {
	const { address } = useAccount()
	const [isOpen, setIsOpen] = useState(false)
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
				<h4>Quests</h4>
				{address && (
					<Button
						onClick={() => {
							setIsOpen(true)
						}}
						size="xs"
						className="body1"
						variant="black"
					>
						See history
					</Button>
				)}
			</div>
			{quests.length === 0 && (
				<Card className="row jc">
					<h4 className="body4">Coming Soon</h4>
				</Card>
			)}
			{quests[0] && <QuestCard quest={quests[0]} user={user} />}
			<div className={classNames.otherQuestsWrap}>
				{quests[1] && <QuestCard quest={quests[1]} user={user} variant="normal" />}
				<div className={classNames.smallCardsContainer}>
					{quests[2] && <QuestCard quest={quests[2]} user={user} variant="small" />}
					{quests[3] && <QuestCard quest={quests[3]} user={user} variant="small" />}
				</div>
			</div>

			<UserHistory isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	)
}
