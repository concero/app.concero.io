import type { IQuestInProgress, IUser } from '../../../../api/concero/user/userType'
import { useEffect, useState } from 'react'
import classNames from './QuestCard.module.pcss'
import { Card } from '../../../cards/Card/Card'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { ArrowRightIcon } from '../../../../assets/icons/ArrowRightIcon'
import { QuestModal } from '../QuestModal/QuestModal'
import { type IQuest, QuestCategory, QuestType } from '../../../../api/concero/quest/questType'
import { config } from '../../../../constants/config'
import { getQuestDaysLeft, hasQuestEventStarted } from './getQuestStatus'
import { QuestStatus } from '../QuestStatus'
import { getDaysUntil } from '../../../../utils/date/getDaysUntil'

interface QuestCardProps {
	variant?: 'big' | 'normal' | 'small'
	quest: IQuest
	user: IUser | null | undefined
	className?: string
}

export const categoryNameMap = {
	[QuestCategory.OnChain]: 'On chain',
	[QuestCategory.Socials]: 'Socials',
	[QuestCategory.Common]: 'Common',
	[QuestCategory.Campaign]: 'Campaign',
}

export const getDateUnitMap = (type: QuestType) => {
	if (type === QuestType.Daily) return 'day'
	if (type === QuestType.Primary || type === QuestType.Secondary) return 'week'
	if (type === QuestType.Monthly) return 'month'

	return null
}

export const QuestCard = ({ variant = 'big', quest, user, className }: QuestCardProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [completedStepIds, setCompletedStepIds] = useState<number[]>([])
	const [rewardIsClaimed, setRewardIsClaimed] = useState<boolean>(false)

	const isDailyQuest = quest.type === QuestType.Daily

	const isSocialQuest = quest.category === QuestCategory.Socials

	const { name, startDate, endDate, image } = quest
	const questIsComplete = completedStepIds.length === quest.steps.length
	const questIsBegin = hasQuestEventStarted(startDate)
	const daysLeft = getDateUnitMap(quest.type) ? getDaysUntil(getDateUnitMap(quest.type)!) : getQuestDaysLeft(endDate)

	if (!questIsBegin) return null

	useEffect(() => {
		if (!user) return

		console.log(user.completedQuests, quest._id, user.completedQuests[quest._id])
		if (user.completedQuests[String(quest._id)]) {
			setRewardIsClaimed(true)
		}

		if (user.questsInProgress[String(quest._id)]) {
			setCompletedStepIds(user.questsInProgress[quest._id])
		}
	}, [user, quest])

	const handleOpenQuest = () => {
		if (rewardIsClaimed) return
		setIsOpen(true)
	}

	const questImage = (
		<img
			className={quest.type === QuestType.Campaign ? classNames.campaignImage : classNames.questImage}
			width={'100%'}
			src={
				quest.image
					? `${config.assetsURI}/icons/quests/${image}`
					: `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
			}
			onError={(e: any) => {
				e.target.src = `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
			}}
			alt="Quest image"
		/>
	)

	// don't display daily social quest if they don't have a link
	if (isDailyQuest && isSocialQuest && !quest.steps[0].options?.link) return null

	return (
		<>
			<div
				style={{ cursor: `${rewardIsClaimed ? 'default' : 'pointer'}` }}
				className={`${classNames.questCard} ${classNames[variant]} ${className}`}
				onClick={handleOpenQuest}
			>
				<Card className={`jsb h-full gap-lg`} key={variant}>
					<div className="gap-sm">
						{variant !== 'small' && (
							<div className="row jsb ac">
								<p className="body2">{categoryNameMap[quest.category]}</p>
								<QuestStatus
									isRepeat={!!getDateUnitMap(quest.type)}
									questType={quest.type}
									daysLeft={daysLeft}
									isStarted={completedStepIds.length > 0}
									isCompleted={questIsComplete}
									rewardIsClaimed={rewardIsClaimed}
								/>
							</div>
						)}
						<div className="h-full gap-xs">
							{variant === 'big' ? (
								<h3 className={classNames.title}>{name}</h3>
							) : (
								<h4 className={classNames.title}>{name}</h4>
							)}
							{!!quest.rewards.points && (
								<h6 className={classNames.points}>+ {quest.rewards.points} CERs</h6>
							)}
						</div>
					</div>

					{variant === 'big' && quest.image && questImage}

					{!rewardIsClaimed && (
						<div className="row w-full jfe">
							<IconButton size="sm" variant="secondary">
								<ArrowRightIcon />
							</IconButton>
						</div>
					)}
				</Card>
			</div>
			<QuestModal
				setRewardIsClaimed={setRewardIsClaimed}
				rewardIsClaimed={rewardIsClaimed}
				setCompletedStepIds={setCompletedStepIds}
				completedStepIds={completedStepIds}
				daysLeft={daysLeft}
				user={user}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				quest={quest}
			/>
		</>
	)
}
