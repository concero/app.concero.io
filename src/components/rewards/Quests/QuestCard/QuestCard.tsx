import type { IUser } from '../../../../api/concero/user/userType'
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
import type { UserActionQuestData } from '../../../../api/concero/userActions/userActionType'
import dayjs from 'dayjs'

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

export const QuestCard = ({ variant = 'big', quest, user, className }: QuestCardProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [completedStepIds, setCompletedStepIds] = useState<number[]>([])
	const [rewardIsClaimed, setRewardIsClaimed] = useState<boolean>(false)

	const isDailyQuest = quest.type === QuestType.Daily
	const isSocialQuest = quest.category === QuestCategory.Socials

	useEffect(() => {
		if (quest.userAction) {
			const userQuestData = quest.userAction.data as UserActionQuestData

			const nowDate = dayjs()
			const isMoreOneDayDifference = nowDate.diff(userQuestData.timestamp, 'day') >= 1
			const isNewDailyQuest = isDailyQuest && isMoreOneDayDifference

			if (isNewDailyQuest) return

			setRewardIsClaimed(userQuestData.isCompleted || false)
			setCompletedStepIds(userQuestData.completedQuestStepIds!)
		}
	}, [user, quest])

	const { name, startDate, endDate, image } = quest
	const questIsComplete = completedStepIds.length === quest.steps.length
	const questIsBegin = hasQuestEventStarted(startDate)
	const daysLeft = getQuestDaysLeft(endDate)

	if (!questIsBegin) return null

	const handleOpenQuest = () => {
		if (rewardIsClaimed) return
		setIsOpen(true)
	}

	const questImage = quest.image ? (
		<img
			className={quest.type === QuestType.Campaign ? classNames.campaignImage : classNames.questImage}
			width={'100%'}
			src={`${config.assetsURI}/icons/quests/${image}`}
			alt="Quest image"
		/>
	) : null

	// don't display social quest if they don't have a link
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
