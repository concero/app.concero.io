import { config } from '@/constants/config'
import { TQuest } from '../../model/types/response'
import cls from './QuestRewardCard.module.pcss'
import { Alert } from '@/components/layout/Alert/Alert'
import { Button } from '@concero/ui-kit'
type TProps = {
	quest: TQuest
	onDone?: () => void
}

export const QuestRewardCard = (props: TProps) => {
	const { quest, onDone } = props

	const showRoleAlert = !!quest.quest_reward.roleReward?.name == true
	const pointsToShow = Math.max(
		quest.quest_reward.tokenReward?.min_value ?? 0,
		quest.quest_reward.tokenReward?.max_value ?? 0,
	)
	return (
		<div className={cls.reward_card}>
			<div className={cls.wrap_inner_card}>
				<div className={cls.image_wrap}>
					<img
						className={`${cls.image}  ${quest.image ? '' : cls.placeholder_image} `}
						width={'100%'}
						src={
							quest.image
								? `${config.assetsURI}/icons/quests/${quest.image}`
								: `${config.assetsURI}/icons/quests/QuestRewardPlaceholder.webp`
						}
						onError={(e: any) => {
							e.target.src = `${config.assetsURI}/icons/quests/QuestRewardPlaceholder.webp`
						}}
						loading="lazy"
						alt="Quest image"
					/>
				</div>
				<div className={cls.description_wrap}>
					<div className={cls.points}>+ {pointsToShow} CERs </div>
					<div className={cls.description}>For completing "{quest.title}" </div>
				</div>
			</div>
			{showRoleAlert && (
				<Alert
					title="Role Coming This Week!"
					subtitle="Your Discord role will be assigned automatically by the end of the week"
				/>
			)}
			<Button isFull size="l" onClick={onDone}>
				Done
			</Button>
		</div>
	)
}
