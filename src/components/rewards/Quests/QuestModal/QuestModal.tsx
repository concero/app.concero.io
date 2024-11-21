import { Modal } from '../../../modals/Modal/Modal'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IQuest } from '../../../../api/concero/quest/questType'
import classNames from './QuestModal.module.pcss'
import { type IUser } from '../../../../api/concero/user/userType'
import { QuestStep } from './QuestStep/QuestStep'
import { config } from '../../../../constants/config'
import { categoryNameMap } from '../QuestCard/QuestCard'
import { Button } from '../../../buttons/Button/Button'
import { RewardModal } from './RewardModal'
import { QuestStatus } from '../QuestStatus'
import { claimQuestReward } from '../../../../api/concero/quest/claimQuestReward'
import { useWeb3Modal } from '@web3modal/wagmi/react'

interface QuestModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	quest: IQuest
	daysLeft: number
	user: IUser | null | undefined
	completedStepIds: number[]
	setCompletedStepIds: Dispatch<SetStateAction<number[]>>
	rewardIsClaimed: boolean
	setRewardIsClaimed: Dispatch<SetStateAction<boolean>>
}

export const QuestModal = ({
	setCompletedStepIds,
	setRewardIsClaimed,
	completedStepIds,
	rewardIsClaimed,
	quest,
	isOpen,
	setIsOpen,
	user,
	daysLeft,
}: QuestModalProps) => {
	const { open } = useWeb3Modal()
	const [rewardModalIsOpen, setRewardModalIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [points, setPoints] = useState<number>(0)
	const { name, description, rewards, steps, image } = quest

	const handleClaimReward = async () => {
		if (!user) return
		setIsLoading(true)

		try {
			const result = await claimQuestReward(quest._id, user._id)

			if (result.points > 0) {
				setPoints(result.points)
				setRewardIsClaimed(true)
				setRewardModalIsOpen(true)
			}
		} catch (err) {
			console.log(err)
		}

		setIsLoading(false)
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
			<QuestStatus
				questType={quest.type}
				daysLeft={daysLeft}
				isStarted={completedStepIds.length > 0}
				isCompleted={isQuestCompleted}
				rewardIsClaimed={rewardIsClaimed}
			/>
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
				{steps.map(step => {
					return (
						<QuestStep
							isCompleted={completedStepIds.includes(+step.id)}
							addCompletedStep={addCompletedStep}
							questId={quest._id}
							user={user}
							step={step}
							key={step.id}
						/>
					)
				})}
			</div>
		</div>
	)

	const oneStep = !isQuestCompleted && (
		<QuestStep addCompletedStep={addCompletedStep} questId={quest._id} user={user} mode="one" step={steps[0]} />
	)

	if (rewardModalIsOpen) {
		return <RewardModal points={points} show={rewardModalIsOpen} setShow={setRewardModalIsOpen} quest={quest} />
	}

	return (
		<Modal position="top" className={classNames.questModal} show={isOpen} setShow={setIsOpen} title={questTitle}>
			<div className={classNames.mainInfo}>
				<div className="w-full gap-sm">
					<h2>{name}</h2>
					{!!rewards.points && <h6 className={classNames.points}>+ {rewards.points} CERs</h6>}
				</div>

				{questImage}

				<p className={`${classNames.description} body3`}>{description}</p>
			</div>

			{steps.length > 1 ? stepsGroup : oneStep}

			{!user && (
				<div className="row w-full">
					<Button size="lg" isLoading={isLoading} isDisabled={rewardIsClaimed} onClick={open}>
						Connect wallet
					</Button>
				</div>
			)}

			{isQuestCompleted && !rewardIsClaimed && (
				<Button isLoading={isLoading} isDisabled={rewardIsClaimed} onClick={handleClaimReward}>
					Claim reward
				</Button>
			)}
		</Modal>
	)
}
