import { useState } from 'react'
import { categoryQuestNameMap, QuestPreviewCard, QuestStatus, TQuest, TUserQuest } from '@/entities/Quest'
import { QuestCard } from '../QuestCard/QuestCard'
import { QuestRewardCard } from '@/entities/Quest'
// import { Modal } from '@/components/modals/Modal/Modal'
import cls from './QuestPreviewItem.module.pcss'
import { action, category } from '@/constants/tracking'
import { trackEvent } from '@/hooks/useTracking'
import { getEventTypeQuest } from '@/shared/lib/utils/events/getEventTypeQuest'
import { Modal } from '@concero/ui-kit'

type TProps = {
	quest: TQuest
	userQuest?: TUserQuest
	className?: string
}

export const QuestPreviewItem = (props: TProps) => {
	const { quest, userQuest, className } = props
	const [isOpenQuestCard, setIsOpenQuestCard] = useState(false)
	const [isOpenRewardModal, setIsOpenRewardModal] = useState(false)
	const rewardIsClaimed = !!userQuest?.finished_at

	const handleClaimReward = async (quest: TQuest) => {
		await trackEvent({
			category: category.QuestCard,
			action: action.ClaimQuest,
			label: 'concero_claim_quest',
			data: { id: quest.id, type: getEventTypeQuest(quest as TQuest) },
		})
		setIsOpenQuestCard(false)
		setIsOpenRewardModal(true)
	}

	return (
		<>
			<QuestPreviewCard
				quest={quest}
				userQuest={userQuest}
				onClick={() => {
					setIsOpenQuestCard(true)
				}}
				onClaim={handleClaimReward}
				className={className}
			/>
			<div className={cls.wrap_modal}>
				<Modal
					position="top"
					className={cls.quest_modal}
					show={isOpenQuestCard}
					onClose={() => setIsOpenQuestCard(false)}
					title={
						<div className={cls.meta_info}>
							<span className={cls.category}>{categoryQuestNameMap[quest.category]}</span>
							<span className={cls.quest}>
								<QuestStatus quest={quest} isClaimed={rewardIsClaimed} userQuest={userQuest} />
							</span>
						</div>
					}
				>
					<QuestCard onClaim={handleClaimReward} quest={quest} userQuest={userQuest} />
				</Modal>
			</div>
			<Modal
				headless
				onClose={() => setIsOpenRewardModal(false)}
				position="top"
				className={cls.rewards_modal}
				show={isOpenRewardModal}
			>
				<QuestRewardCard quest={quest} onDone={() => setIsOpenRewardModal(false)} />
			</Modal>
		</>
	)
}
