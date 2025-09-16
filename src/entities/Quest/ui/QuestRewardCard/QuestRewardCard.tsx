import { TQuest } from '../../model/types/response'
import cls from './QuestRewardCard.module.pcss'
import { Alert, Button } from '@concero/ui-kit'
import { AppImage } from '@/shared/ui/AppImage'
import { VStack } from '@/shared/ui/Stack'
import QuestReward from '@/shared/assets/images/quest/QuestReward.png'
import QuestPlaceholder from '@/shared/assets/images/quest/QuestPlaceholder.webp'
import InfoIcon from '@/shared/assets/icons/monochrome/info.svg?react'

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
		<VStack gap="space_1" align="center" className={cls.reward_card}>
			<div className={cls.wrap_inner_card}>
				<AppImage
					src={QuestReward}
					alt="Quest reward image"
					fallbackSrc={QuestPlaceholder}
					className={cls.image}
				/>
				<div className={cls.description_wrap}>
					<div className={cls.points}>+ {pointsToShow} CERs </div>
					<div className={cls.description}>For completing "{quest.title}" </div>
				</div>
			</div>
			{showRoleAlert && (
				<Alert
					type="branded"
					title="Role Coming This Week!"
					description="Your Discord role will be assigned automatically by the end of the week"
					className={cls.alert}
					icon={<InfoIcon />}
				/>
			)}
			<Button isFull size="l" onClick={onDone}>
				Done
			</Button>
		</VStack>
	)
}
