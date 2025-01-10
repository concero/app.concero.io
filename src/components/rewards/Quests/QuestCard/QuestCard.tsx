import type { IUser } from '../../../../api/concero/user/userType'
import { useEffect, useState } from 'react'
import classNames from './QuestCard.module.pcss'
import { Card } from '../../../cards/Card/Card'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { ArrowRightIcon } from '../../../../assets/icons/ArrowRightIcon'
import { QuestModal } from '../QuestModal/QuestModal'
import { type IQuest, QuestCategory, QuestType } from '../../../../api/concero/quest/questType'
import { config } from '../../../../constants/config'
import { getQuestDaysLeft } from './getQuestStatus'
import { QuestStatus } from '../QuestStatus'
import { CersIcon } from '../../../../assets/icons/CersIcon'
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

const normalizeEndDate = (endDate: any) => {
	if (typeof endDate === 'object' && endDate.$numberDecimal) {
		return parseInt(endDate.$numberDecimal, 10)
	}
	return endDate
}

export const QuestCard = ({ variant = 'big', quest, user, className }: QuestCardProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [completedStepIds, setCompletedStepIds] = useState<number[]>([])
	const [rewardIsClaimed, setRewardIsClaimed] = useState<boolean>(false)

	const isDailyQuest = quest.type === QuestType.Daily
	const isSocialQuest = quest.category === QuestCategory.Socials

	const { name, image, endDate, _id } = quest
	const questStepsCompleted = completedStepIds.length === quest.steps.length

	const normalizedEndDate = normalizeEndDate(endDate)
	const daysLeft = getQuestDaysLeft(normalizedEndDate)

	useEffect(() => {
		if (!user) return

		if (Array.isArray(user.completedQuests)) {
			if (user.completedQuests.includes(_id.toString())) {
				setRewardIsClaimed(true)
			}
		} else if (typeof user.completedQuests === 'object') {
			if (user.completedQuests.hasOwnProperty(_id.toString())) {
				setRewardIsClaimed(true)
			}
		}

		if (Array.isArray(user.questsInProgress)) {
			const questInProgress = user.questsInProgress.find((q: { questId: string }) => q.questId === _id.toString())
			if (questInProgress) {
				setCompletedStepIds(questInProgress.completedSteps)
			}
		} else if (typeof user.questsInProgress === 'object') {
			const questInProgress = user.questsInProgress[_id.toString()]
			if (questInProgress) {
				setCompletedStepIds(questInProgress)
			}
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
			loading="lazy"
			alt="Quest image"
		/>
	)

	// don't display daily social quest if they don't have a link
	if (isDailyQuest && isSocialQuest && !quest.steps[0].options?.link) return null

	let rewardsToShow: string = '0'
	// Display either pointsToshow or points
	if (quest.rewards.pointsToShow && quest.rewards.pointsToShow.length > 0) {
		rewardsToShow = quest.rewards.pointsToShow
	} else if (quest.rewards.points) {
		rewardsToShow = String(quest.rewards.points)
	}
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
									isCompleted={questStepsCompleted}
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
								<div className={classNames.rewards}>
									<h6 className={classNames.points}>+ {rewardsToShow}</h6>
									<CersIcon />
								</div>
							)}
						</div>
					</div>

					{variant === 'big' && questImage}

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
