import { useState } from 'react'
import { useAccount } from 'wagmi'
import {
	categoryQuestNameMap,
	QuestPreviewCard,
	QuestStatus,
	TQuest,
	type TQuestCardStatus,
	TUserQuest,
} from '@/entities/Quest'
import { QuestCard } from '../QuestCard/QuestCard'
import { QuestRewardCard } from '@/entities/Quest'
import { Modal } from '@/components/modals/Modal/Modal'
import cls from './QuestPreviewItem.module.pcss'
import { action, category } from '@/constants/tracking'
import { trackEvent } from '@/hooks/useTracking'
import { getEventTypeQuest } from '@/shared/lib/utils/events/getEventTypeQuest'
import { getIsCanClaimQuest } from '@/entities/User'

type TProps = {
	quest: TQuest
	userQuest?: TUserQuest
	className?: string
}

export const QuestPreviewItem = (props: TProps) => {
	const { quest, userQuest, className } = props
	const { address } = useAccount()
	const [isOpenQuestCard, setIsOpenQuestCard] = useState(false)
	const [isOpenRewardModal, setIsOpenRewardModal] = useState(false)
	const rewardIsClaimed = !!userQuest?.finished_at
	let statusOfQuest: TQuestCardStatus = address ? 'READY_TO_START' : 'NOT_CONNECT'
	if (userQuest?.started_at) {
		statusOfQuest = 'STARTED'
	}
	if (userQuest && getIsCanClaimQuest({ quest, userQuest })) {
		statusOfQuest = 'READY_TO_CLAIM'
	}

	if (rewardIsClaimed) {
		statusOfQuest = 'FINISHED'
	}

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

	if (isOpenRewardModal) {
		return (
			<Modal
				isHeaderVisible={false}
				position="top"
				className={cls.rewards_modal}
				show={true}
				setShow={(arg: boolean) => {
					arg ? setIsOpenRewardModal(true) : setIsOpenRewardModal(false)
				}}
			>
				<QuestRewardCard quest={quest} onDone={() => setIsOpenRewardModal(false)} />
			</Modal>
		)
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
			<Modal
				position="top"
				className={cls.questModal}
				show={isOpenQuestCard}
				setShow={(arg: boolean) => {
					arg ? setIsOpenQuestCard(true) : setIsOpenQuestCard(false)
				}}
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
		</>
	)
}
