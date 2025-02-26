import { Card } from '@/shared/ui/Card/Card'
import type { TQuest } from '../../model/types/response'
import cls from './QuestPreviewCard.module.pcss'
import { QuestStatus } from './QuestStatus'
import { config } from '@/constants/config'
import { IconButton } from '@/components/buttons/IconButton/IconButton'
import ArrowRightIcon from '@/shared/assets/icons/monochrome/ArrowRight.svg?react'
import { TUserResponse } from '@/entities/User'
import clsx from 'clsx'
import { categoryQuestNameMap } from '../../config/nameMaps'
import { getIsClaimedQuest } from '../../model/lib/getIsClaimedQuest'

type TClassname = string
export type TQuestPreviewSize = 's' | 'm' | 'l' | 'xl'
type TProps = {
	size?: TQuestPreviewSize
	quest?: TQuest
	user?: TUserResponse
	onClick?: () => void
}

export const QuestPreviewCard = (props: TProps) => {
	const { size = 's', quest, user, onClick } = props
	if (!quest) return null

	const sizeClassMap: Record<TQuestPreviewSize, TClassname> = {
		s: cls.size_s,
		m: cls.size_m,
		l: cls.size_l,
		xl: cls.size_xl,
	}

	const showMetaInfo = size !== 's'
	const showImage = size !== 's'
	const rewardIsClaimed = getIsClaimedQuest(quest._id, user)
	return (
		<Card
			className={clsx(cls.preview_item, sizeClassMap[size], { [cls.disabled]: rewardIsClaimed })}
			onClick={onClick}
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
				{!rewardIsClaimed && (
					<IconButton size="sm" variant="secondary">
						<ArrowRightIcon />
					</IconButton>
				)}
			</div>
		</Card>
	)
}
