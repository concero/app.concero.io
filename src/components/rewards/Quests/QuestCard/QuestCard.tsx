import type { IUser } from '../../../../api/concero/user/userType'
import { useState } from 'react'
import { getQuestStatus } from '../QuestsGroup/getQuestStatus'
import classNames from './QuestCard.module.pcss'
import { Card } from '../../../cards/Card/Card'
import { Tag } from '../../../tags/Tag/Tag'
import { IconButton } from '../../../buttons/IconButton/IconButton'
import { ArrowRightIcon } from '../../../../assets/icons/ArrowRightIcon'
import { QuestModal } from '../QuestModal/QuestModal'
import type { IQuest } from '../../../../api/concero/quest/questType'

interface QuestCardProps {
	variant?: 'big' | 'normal' | 'small'
	quest: IQuest
	user: IUser | null | undefined
	className?: string
}

export const QuestCard = ({ variant = 'big', quest, user, className }: QuestCardProps) => {
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
				className={`${classNames.questCard} ${classNames[variant]} ${className}`}
				onClick={() => {
					setIsOpen(true)
				}}
			>
				<Card className={`jsb h-full gap-lg`} key={variant}>
					{variant !== 'small' && (
						<div className="row jsb ac">
							<p className="body2">Socials</p>
							<Tag size="sm" variant={'neutral'}>
								00 days left
							</Tag>
						</div>
					)}
					<div className="h-full gap-xs">
						{variant === 'big' ? (
							<h3 className={classNames.title}>{name}</h3>
						) : (
							<h4 className={classNames.title}>{name}</h4>
						)}
						<h6 className={classNames.points}>+ 25 CERs</h6>
					</div>
					{questImage}
					<div className="row w-full jfe">
						<IconButton size="sm" variant="secondary">
							<ArrowRightIcon />
						</IconButton>
					</div>
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
