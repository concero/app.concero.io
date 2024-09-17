import classNames from './QuestsCard.module.pcss'
import { Card } from '../../cards/Card/Card'
import { Tag } from '../../tags/Tag/Tag'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Button } from '../../buttons/Button/Button'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getQuestStatus, QuestStatus } from './getQuestStatus'
import { type IQuest } from '../../../api/concero/quest/questType'
import { fetchQuests } from '../../../api/concero/quest/fetchQuests'
import { QuestModal } from '../../modals/QuestModal/QuestModal'
import type { IUser } from '../../../api/concero/user/userType'
import { ArrowRightIcon } from '../../../assets/icons/ArrowRightIcon'
import { IconButton } from '../../buttons/IconButton/IconButton'

interface QuestCardProps {
	variant?: 'big' | 'normal' | 'small'
	quest: IQuest
	user: IUser | null | undefined
	className?: string
}

interface QuestsCardProps {
	user: IUser | null | undefined
}

const QuestCard = ({ variant = 'big', quest, user, className }: QuestCardProps) => {
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
				className={`${classNames.questCard} ${className}`}
				onClick={() => {
					setIsOpen(true)
				}}
			>
				<Card className={`jsb h-full gap-lg`} key={variant}>
					<div className="row jsb ac">
						<p className="body2">Socials</p>
						<Tag size="sm" variant={'neutral'}>
							00 days left
						</Tag>
					</div>
					<div className="h-full gap-xs">
						{variant === 'big' ? <h3>{name}</h3> : <h4>{name}</h4>}
						<h6>+ 25 CERs</h6>
					</div>
					{questImage}
					<IconButton size="sm" variant="secondary">
						<ArrowRightIcon />
					</IconButton>
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
			</div>
			{quests.length === 0 && (
				<Card className="row jc">
					<h4 className="body4">Coming Soon</h4>
				</Card>
			)}
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
