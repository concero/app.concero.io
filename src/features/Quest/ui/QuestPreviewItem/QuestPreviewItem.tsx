import { useCallback, useState } from 'react'
import cls from './QuestPreviewItem.module.pcss'
import { useAccount } from 'wagmi'
import { Modal } from '@/components/modals/Modal/Modal'
import {
	categoryQuestNameMap,
	QuestCard,
	QuestPreviewCard,
	QuestStatus,
	TQuest,
	QuestStepGroup,
	type TQuestCardStatus,
	type TQuestPreviewSize,
	getIsClaimedQuest,
	useClaimQuestMutation,
} from '@/entities/Quest'
import {
	useAddQuestToProgressMutation,
	getCompletedStepsByQuest,
	getIsStartedQuest,
	type TUserResponse,
} from '@/entities/User'

type TProps = {
	quest: TQuest
	user?: TUserResponse
	size?: TQuestPreviewSize
}

export const QuestPreviewItem = (props: TProps) => {
	const { quest, user, size } = props
	const { address } = useAccount()
	const [isOpen, setIsopen] = useState(false)
	const { mutate: addQuestInProgress } = useAddQuestToProgressMutation()
	const startTheQuest = useCallback(() => {
		if (address) {
			addQuestInProgress({ address, questId: quest._id })
		}
	}, [])
	const { mutate: claimQuest } = useClaimQuestMutation()
	const claimThisQuest = useCallback(() => {
		if (address) {
			claimQuest({ address, questId: quest._id })
		}
	}, [])

	let statusOfQuest: TQuestCardStatus = address ? 'READY_TO_START' : 'NOT_CONNECT'
	if (user && getIsStartedQuest(quest._id, user)) {
		statusOfQuest = 'STARTED'
	}
	const completedSteps = user ? getCompletedStepsByQuest(quest._id, user) : []
	if (completedSteps.length === quest.steps.length) {
		statusOfQuest = 'READY_TO_CLAIM'
	}
	const rewardIsClaimed = getIsClaimedQuest(quest._id, user)
	if (rewardIsClaimed) {
		statusOfQuest = 'FINISHED'
	}

	return (
		<>
			<QuestPreviewCard
				quest={quest}
				size={size}
				user={user}
				onClick={() => {
					setIsopen(true)
				}}
			/>
			<Modal
				position="top"
				className={cls.questModal}
				show={isOpen}
				setShow={(arg: boolean) => {
					arg ? setIsopen(true) : setIsopen(false)
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
				<QuestCard
					quest={quest}
					status={statusOfQuest}
					onStart={startTheQuest}
					onClaim={claimThisQuest}
					StepsSlot={<QuestStepGroup quest={quest} />}
				/>
			</Modal>
		</>
	)
}
