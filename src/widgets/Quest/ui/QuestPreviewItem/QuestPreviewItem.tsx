import { useState } from 'react'
import cls from './QuestPreviewItem.module.pcss'
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

type TProps = {
	quest: TQuest
	user?: TUserResponse
	size?: TQuestPreviewSize
}

export const QuestPreviewItem = (props: TProps) => {
	const { quest, user, size } = props
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

	const handleClaimReward = () => {
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
