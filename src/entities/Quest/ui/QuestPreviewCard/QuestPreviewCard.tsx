import { Card } from '@/shared/ui/Card/Card'
import { IconButton, useTheme } from '@concero/ui-kit'
import clsx from 'clsx'
import { ClaimReward } from '@/features/Quest'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui'
import { configEnvs } from '@/shared/consts/config/config'
import { AppImage } from '@/shared/ui/AppImage'
import QuestPlaceholder from '@/shared/assets/images/quest/QuestPlaceholder.webp'
import ArrowRightIcon from '@/shared/assets/icons/monochrome/ArrowRight.svg?react'
import CersIcon from '@/shared/assets/icons/CersIcon.svg?react'
import type { TQuest, TQuestSize, TUserQuest } from '../../model/types/response'
import { useQuestCardState } from '../../model/lib/useQuestCardState'
import { useQuestCardLogic } from '../../model/lib/useQuestCardLogic'
import { BlockerQuestFooter } from '../BlockerQuestFooter/BlockerQuestFooter'
import { QuestStatus } from './QuestStatus'
import cls from './QuestPreviewCard.module.pcss'

type TClassname = string
type TProps = {
	quest?: TQuest
	userQuest?: TUserQuest
	onClick?: () => void
	onClaim?: (quest: TQuest) => void
	className?: string
}

const sizeClassMap: Record<TQuestSize, TClassname> = {
	s: cls.size_s,
	m: cls.size_m,
	l: cls.size_l,
	xl: cls.size_xl,
}
export const QuestPreviewCard = (props: TProps) => {
	const { quest, onClick, onClaim, userQuest, className } = props

	const { theme } = useTheme()
	if (!quest) return null
	const { isHovered, isPressed, setIsHovered, setIsPressed } = useQuestCardState()
	const { size, rewardIsClaimed, isCanClaimQuest, isLocked, showMetaInfo, showImage, reward, categoryLabel } =
		useQuestCardLogic(quest, userQuest)

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
						<span className={cls.category}>{categoryLabel}</span>
						<span className={cls.quest}>
							<QuestStatus
								quest={quest}
								isClaimed={rewardIsClaimed}
								userQuest={userQuest}
								isLocked={isLocked}
							/>
						</span>
					</div>
				)}
				<div className={cls.title_wrap}>
					<span className={cls.title}>{quest.title}</span>
					<HStack align="center" gap="space_0_25">
						<Text variant="heading_large" className={cls.rewards}>
							+{reward}
						</Text>
						<CersIcon className={cls.icon} />
					</HStack>
				</div>
			</div>
			{showImage && (
				<div className={clsx(cls.image_wrap, { [cls.size_xl]: size === 'xl' })}>
					<AppImage
						src={`${configEnvs.assetsURI}/quests/${theme == 'dark' ? 'dark_' : ''}${quest.image}`}
						alt="Quest image"
						fallbackSrc={QuestPlaceholder}
						retryTimeout={10000}
					/>
				</div>
			)}
			<div className={cls.footer}>
				{!rewardIsClaimed && !isCanClaimQuest && !isLocked && (
					<IconButton size="s" variant="secondary" isHovered={isHovered} isPressed={isPressed}>
						<ArrowRightIcon />
					</IconButton>
				)}
				{userQuest && isCanClaimQuest && !rewardIsClaimed && !isLocked && (
					<ClaimReward userQuestId={userQuest.id} onClaim={() => onClaim?.(quest)} />
				)}
				{isLocked && quest.blocker && <BlockerQuestFooter blocker={quest.blocker} />}
			</div>
		</Card>
	)
}
