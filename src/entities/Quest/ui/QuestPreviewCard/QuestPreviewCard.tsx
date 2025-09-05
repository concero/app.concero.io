import { Card } from '@/shared/ui/Card/Card'
import type { TQuest, TQuestSize, TUserQuest } from '../../model/types/response'
import cls from './QuestPreviewCard.module.pcss'
import { QuestStatus } from './QuestStatus'
import ArrowRightIcon from '@/shared/assets/icons/monochrome/ArrowRight.svg?react'
import clsx from 'clsx'
import { categoryQuestNameMap } from '../../config/nameMaps'
import { ClaimReward } from '@/features/Quest'
import { useEffect, useState } from 'react'
import { IconButton, useTheme } from '@concero/ui-kit'
import { getIsCanClaimQuest } from '@/entities/User'
import { configEnvs } from '@/shared/consts/config/config'
import { AppImage } from '@/shared/ui/AppImage'
import QuestPlaceholder from '@/shared/assets/images/quest/QuestPlaceholder.webp'
type TClassname = string
type TProps = {
	quest?: TQuest
	userQuest?: TUserQuest
	onClick?: () => void
	onClaim?: (quest: TQuest) => void
	className?: string
}

export const QuestPreviewCard = (props: TProps) => {
	const { quest, onClick, onClaim, userQuest, className } = props
	const { theme } = useTheme()
	if (!quest) return null
	const size = quest.size
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
	const sizeClassMap: Record<TQuestSize, TClassname> = {
		s: cls.size_s,
		m: cls.size_m,
		l: cls.size_l,
		xl: cls.size_xl,
	}

	const showMetaInfo = size !== 's'
	const showImage = size !== 's' && size !== 'm'
	const rewardIsClaimed = Boolean(userQuest?.finished_at)
	const isCanClaimQuest = getIsCanClaimQuest({ quest, userQuest })
	const reward = Math.max(
		quest.quest_reward?.tokenReward?.min_value ?? 0,
		quest.quest_reward?.tokenReward?.max_value ?? 0,
	)
	return (
		<Card
			className={clsx(cls.preview_item, sizeClassMap[size], { [cls.disabled]: rewardIsClaimed }, className)}
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
							<QuestStatus quest={quest} isClaimed={rewardIsClaimed} userQuest={userQuest} />
						</span>
					</div>
				)}
				<div className={cls.title_wrap}>
					<span className={cls.title}>{quest.title}</span>
					<span className={cls.rewards}>+{reward} CERs</span>
				</div>
			</div>
			{showImage && (
				<div className={cls.image_wrap}>
					<AppImage
						src={`${configEnvs.assetsURI}/quests/${theme == 'dark' ? 'dark_' : ''}${quest.image}`}
						alt="Quest image"
						fallbackSrc={QuestPlaceholder}
						retryTimeout={5000}
					/>
				</div>
			)}
			<div className={cls.footer}>
				{!rewardIsClaimed && !isCanClaimQuest && (
					<IconButton size="s" variant="secondary" isHovered={isHovered} isPressed={isPressed}>
						<ArrowRightIcon />
					</IconButton>
				)}
				{userQuest && isCanClaimQuest && !rewardIsClaimed && (
					<ClaimReward userQuestId={userQuest.id} onClaim={() => onClaim?.(quest)} />
				)}
			</div>
		</Card>
	)
}
