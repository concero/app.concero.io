import { useEffect, useState } from 'react'
import { categoryQuestNameMap, QuestPreviewCard, QuestStatus, TQuest, TUserQuest } from '@/entities/Quest'
import { QuestCard } from '../QuestCard/QuestCard'
import { QuestRewardCard } from '@/entities/Quest'
import cls from './QuestPreviewItem.module.pcss'
import { getEventTypeQuest } from '@/shared/lib/utils/events/getEventTypeQuest'
import { Modal } from '@concero/ui-kit'
import { useDisableBodyScroll } from '@/shared/lib/utils/useDisableBodyScroll'
import { trackEvent } from '@/shared/lib/hooks/posthog/useTracking'
import { action, category } from '@/shared/lib/hooks/posthog/tracking'

type TProps = {
	quest: TQuest
	userQuest?: TUserQuest
	className?: string
}

export const QuestPreviewItem = (props: TProps) => {
	const { quest, userQuest, className } = props
	const [isOpenQuestCard, setIsOpenQuestCard] = useState(false)
	const [isOpenRewardModal, setIsOpenRewardModal] = useState(false)
	useDisableBodyScroll(isOpenQuestCard)
	const rewardIsClaimed = !!userQuest?.finished_at

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'q' && event.code === 'KeyQ') {
				event.preventDefault()
				navigator.clipboard
					.writeText(quest.id)
					.then(() => {
						console.log('Quest ID copied to clipboard:', quest.id)
					})
					.catch(error => {
						console.error('Failed to copy Quest ID:', error)
					})
			}
			if (event.ctrlKey && event.key === 'i' && event.code === 'KeyI') {
				event.preventDefault()
				navigator.clipboard
					.writeText(quest.quest_instance_id)
					.then(() => {
						console.log('Quest Instance ID copied to clipboard:', quest.quest_instance_id)
					})
					.catch(error => {
						console.error('Failed to copy Quest ID:', error)
					})
			}
		}
		if (isOpenQuestCard && quest?.id) {
			document.addEventListener('keydown', handleKeyDown)
		}
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [quest.id, isOpenQuestCard])

	const handleClaimReward = async (quest: TQuest) => {
		await trackEvent({
			category: category.QuestCard,
			action: action.FinishQuest,
			label: 'quest_completed',
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
