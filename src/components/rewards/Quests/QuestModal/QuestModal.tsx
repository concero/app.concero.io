import { Modal } from '../../../modals/Modal/Modal'
import { Tag } from '../../../tags/Tag/Tag'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { type IQuest } from '../../../../api/concero/quest/questType'
import classNames from './QuestModal.module.pcss'
import { type IUser } from '../../../../api/concero/user/userType'
import { QuestStep } from './QuestStep/QuestStep'
import { config } from '../../../../constants/config'
import { categoryNameMap } from '../QuestCard/QuestCard'
import { Button } from '../../../buttons/Button/Button'
import { RewardModal } from './RewardModal'
import { type UserActionQuestData } from '../../../../api/concero/userActions/userActionType'

interface QuestModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	quest: IQuest
	daysLeft: number
	user: IUser | null | undefined
}

export const QuestModal = ({ quest, isOpen, setIsOpen, user, daysLeft }: QuestModalProps) => {
	const [completedStepIds, setCompletedStepIds] = useState<number[]>([])
	const [rewardIsClaimed, setRewardIsClaimed] = useState<boolean>(false)
	const [rewardModalIsOpen, setRewardModalIsOpen] = useState<boolean>(false)
	const { name, description, rewards, steps, image } = quest

	useEffect(() => {
		if (quest.userAction) {
			const userQuestData = quest.userAction.data as UserActionQuestData
			setCompletedStepIds(userQuestData.completedQuestStepIds!)
		}
	}, [quest])

	const handleClaimReward = () => {
		setRewardIsClaimed(true)
		setRewardModalIsOpen(true)
	}

	const addCompletedStep = (stepId: number) => {
		setCompletedStepIds([...completedStepIds, stepId])
	}

	const isQuestCompleted = completedStepIds.length === quest.steps.length

	const questImage = quest.image ? (
		<img
			className={classNames.questImage}
			height={160}
			src={`${config.assetsURI}/icons/quests/${image}`}
			alt="Quest image"
		/>
	) : null

	const questTitle = (
		<div className="row gap-sm ac">
			<p className={`${classNames.category} body2`}>{categoryNameMap[quest.category]}</p>
			<Tag size="sm" variant="neutral">
				{completedStepIds.length > 0 && 'Started, '} {daysLeft} {daysLeft > 1 ? 'days' : 'day'} left
			</Tag>
		</div>
	)

	const stepsGroup = (
		<div className="gap-sm">
			<div className="row ac jsb">
				<h6>Steps:</h6>
				<h6>
					{completedStepIds.length}/{steps.length}
				</h6>
			</div>
			<div className="gap-xs">
				{steps.map(step => (
					<QuestStep
						addCompletedStep={addCompletedStep}
						questId={quest._id}
						user={user}
						step={step}
						key={step.id}
					/>
				))}
			</div>
		</div>
	)

	const oneStep = !isQuestCompleted && (
		<QuestStep addCompletedStep={addCompletedStep} questId={quest._id} user={user} mode="one" step={steps[0]} />
	)

	if (rewardModalIsOpen) {
		return <RewardModal show={rewardModalIsOpen} setShow={setRewardModalIsOpen} quest={quest} />
	}

	return (
		<Modal position="top" className={classNames.questModal} show={isOpen} setShow={setIsOpen} title={questTitle}>
			<div className={classNames.mainInfo}>
				<div className="w-full gap-sm">
					<h2>{name}</h2>
					{rewards.points && <h6 className={classNames.points}>+ {rewards.points} CERs</h6>}
				</div>

				{questImage}

				<p className={`${classNames.description} body3`}>{description}</p>
			</div>

			{steps.length > 1 ? stepsGroup : oneStep}

			{!user && (
				<div className="row w-full jc">
					<p className={classNames.connectWalletText}>Connect your wallet to claim rewards</p>
				</div>
			)}

			{isQuestCompleted && (
				<Button isDisabled={rewardIsClaimed} onClick={handleClaimReward}>
					Claim reward
				</Button>
			)}
		</Modal>
	)
}
