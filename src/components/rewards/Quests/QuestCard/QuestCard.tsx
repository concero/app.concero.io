import type { IUser } from '../../../../api/concero/user/userType'
import { useState } from 'react'
import classNames from './QuestCard.module.pcss'
import { Card } from '../../../cards/Card/Card'
import { Tag } from '../../../tags/Tag/Tag'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { ArrowRightIcon } from '../../../../assets/icons/ArrowRightIcon'
import { QuestModal } from '../QuestModal/QuestModal'
import { type IQuest, QuestCategory, QuestType } from '../../../../api/concero/quest/questType'
import { config } from '../../../../constants/config'
import { getQuestDaysLeft, hasQuestEventStarted } from './getQuestStatus'

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
	const { name, startDate, endDate, image } = quest

	const questIsBegin = hasQuestEventStarted(startDate)

	if (!questIsBegin) return null

	const daysLeft = getQuestDaysLeft(endDate)

	const imgWidth = '100%'
	const imgHeight = quest.type === QuestType.Campaign ? 64 : 280

	const questImage = quest.image ? (
		<img
			className={quest.type === QuestType.Campaign ? classNames.campaignImage : classNames.questImage}
			width={imgWidth}
			height={imgHeight}
			src={`${config.assetsURI}/icons/quests/${image}`}
			alt="Quest image"
		/>
	) : null

	return (
		<>
			<div
				className={`${classNames.questCard} ${classNames[variant]} ${className}`}
				onClick={() => {
					setIsOpen(true)
				}}
			>
				<Card className={`jsb h-full gap-lg`} key={variant}>
					<div className="gap-sm">
						{variant !== 'small' && (
							<div className="row jsb ac">
								<p className="body2">{categoryNameMap[quest.category]}</p>
								<Tag size="sm" variant={'neutral'}>
									{daysLeft} {daysLeft > 1 ? 'days' : 'day'} left
								</Tag>
							</div>
						)}
						<div className="h-full gap-xs">
							{variant === 'big' ? (
								<h3 className={classNames.title}>{name}</h3>
							) : (
								<h4 className={classNames.title}>{name}</h4>
							)}
							{quest.rewards.points && (
								<h6 className={classNames.points}>+ {quest.rewards.points} CERs</h6>
							)}
						</div>
					</div>

					{variant === 'big' && quest.image && questImage}

					<div className="row w-full jfe">
						{quest.userAction?.data.completedQuestStepIds.length}
						<IconButton size="sm" variant="secondary">
							<ArrowRightIcon />
						</IconButton>
					</div>
				</Card>
			</div>
			<QuestModal daysLeft={daysLeft} user={user} isOpen={isOpen} setIsOpen={setIsOpen} quest={quest} />
		</>
	)
}
