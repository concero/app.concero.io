import { useState } from 'react'
import { useAccount } from 'wagmi'
import {
	categoryQuestNameMap,
	QuestPreviewCard,
	QuestStatus,
	TQuest,
	type TQuestCardStatus,
	type TQuestPreviewSize,
	getIsClaimedQuest,
} from '@/entities/Quest'
import { getCompletedStepsByQuest, getIsStartedQuest, type TUserResponse } from '@/entities/User'
import { QuestCard } from '../QuestCard/QuestCard'
import { QuestRewardCard } from '@/entities/Quest'
import { Modal } from '@/components/modals/Modal/Modal'
import cls from './QuestPreviewItem.module.pcss'
import { action, category } from '@/constants/tracking'
import { trackEvent } from '@/hooks/useTracking'
import { getEventTypeQuest } from '@/shared/lib/utils/events/getEventTypeQuest'

type TProps = {
	quest: TQuest
	user?: TUserResponse
	size?: TQuestPreviewSize
	className?: string
}

export const QuestPreviewItem = (props: TProps) => {
	const { quest, user, size, className } = props
	const { address } = useAccount()
	const [isOpenQuestCard, setIsOpenQuestCard] = useState(false)
	const [isOpenRewardModal, setIsOpenRewardModal] = useState(false)

	let statusOfQuest: TQuestCardStatus = address ? 'READY_TO_START' : 'NOT_CONNECT'
	if (user && getIsStartedQuest(quest._id, user)) {
		statusOfQuest = 'STARTED'
	}
	const completedSteps = user ? getCompletedStepsByQuest(quest._id, user) : []

	if (completedSteps.length >= quest.steps.filter(step => !step.optional).length) {
		statusOfQuest = 'READY_TO_CLAIM'
	}
	const rewardIsClaimed = getIsClaimedQuest(quest._id, user)
	if (rewardIsClaimed) {
		statusOfQuest = 'FINISHED'
	}

	const handleClaimReward = async (quest: TQuest) => {
		await trackEvent({
			category: category.QuestCard,
			action: action.ClaimQuest,
			label: 'concero_claim_quest',
			data: { id: quest._id, type: getEventTypeQuest(quest as TQuest) },
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
				size={size}
				user={user}
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
							<QuestStatus
								quest={quest}
								isClaimed={rewardIsClaimed}
								questsInProgress={user?.questsInProgress}
							/>
						</span>
					</div>
				}
			>
				<QuestCard onClaim={handleClaimReward} quest={quest} status={statusOfQuest} />
			</Modal>
		</>
	)
}
