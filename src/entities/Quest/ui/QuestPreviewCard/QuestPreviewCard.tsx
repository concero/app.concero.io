import { Card } from '@/shared/ui/Card/Card'
import type { TQuest } from '../../model/types/response'
import cls from './QuestPreviewCard.module.pcss'
import { QuestStatus } from './QuestStatus'
import { config } from '@/constants/config'
import ArrowRightIcon from '@/shared/assets/icons/monochrome/ArrowRight.svg?react'
import { TUserResponse } from '@/entities/User'
import clsx from 'clsx'
import { categoryQuestNameMap } from '../../config/nameMaps'
import { getIsClaimedQuest } from '../../model/lib/getIsClaimedQuest'
import { getIsDoneQuest } from '@/entities/User'
import { ClaimReward } from '@/features/Quest'
import { useEffect, useRef, useState } from 'react'
import { IconButton } from '@concero/ui-kit'

type TClassname = string
export type TQuestPreviewSize = 's' | 'm' | 'l' | 'xl'
type TProps = {
	size?: TQuestPreviewSize
	quest?: TQuest
	user?: TUserResponse
	onClick?: () => void
	onClaim?: () => void
}

export const QuestPreviewCard = (props: TProps) => {
	const { size = 's', quest, user, onClick, onClaim } = props
	if (!quest) return null

	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [isPressed, setIsPressed] = useState<boolean>(false)

	useEffect(() => {
		const handleMouseUp = () => {
			setIsPressed(false)
		}
		document.addEventListener('mouseup', handleMouseUp)
		return () => {
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [])
	const sizeClassMap: Record<TQuestPreviewSize, TClassname> = {
		s: cls.size_s,
		m: cls.size_m,
		l: cls.size_l,
		xl: cls.size_xl,
	}

	const showMetaInfo = size !== 's'
	const showImage = size !== 's'
	const rewardIsClaimed = getIsClaimedQuest(quest._id, user)
	const isDone = getIsDoneQuest(quest, user)
	return (
		<Card
			className={clsx(cls.preview_item, sizeClassMap[size], { [cls.disabled]: rewardIsClaimed })}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onMouseDown={() => setIsPressed(true)}
			onMouseUp={() => setIsPressed(false)}
		>
			<div className={cls.header}>
				{showMetaInfo && (
					<div className={cls.meta_info}>
						<span className={cls.category}>{categoryQuestNameMap[quest.category]}</span>
						<span className={cls.quest}>
							<QuestStatus
								quest={quest}
								isClaimed={rewardIsClaimed}
								questsInProgress={user?.questsInProgress}
							/>
						</span>
					</div>
				)}
				<div className={cls.title_wrap}>
					<span className={cls.title}>{quest.name}</span>
					<span className={cls.rewards}>+{quest.rewards.points} CERs</span>
				</div>
			</div>
			{showImage && (
				<div className={cls.image_wrap}>
					<img
						width={'100%'}
						src={
							quest.image
								? `${config.assetsURI}/icons/quests/${quest.image}`
								: `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
						}
						onError={(e: any) => {
							e.target.src = `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
						}}
						loading="lazy"
						alt="Quest image"
					/>
				</div>
			)}
			<div className={cls.footer}>
				{!rewardIsClaimed && !isDone && (
					<IconButton size="s" variant="secondary" isHovered={isHovered} isPressed={isPressed}>
						<ArrowRightIcon />
					</IconButton>
				)}
				{isDone && <ClaimReward questId={quest._id} onClaim={onClaim} />}
			</div>
		</Card>
	)
}
