import { Modal } from '../../../modals/Modal/Modal'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IQuest, QuestType } from '../../../../api/concero/quest/questType'
import classNames from './QuestModal.module.pcss'
import { type IUser } from '../../../../api/concero/user/userType'
import { QuestStep } from './QuestStep/QuestStep'
import { config } from '../../../../constants/config'
import { categoryNameMap, getDateUnitMap } from '../QuestCard/QuestCard'
import { Button } from '../../../buttons/Button/Button'
import { RewardModal } from './RewardModal'
import { QuestStatus } from '../QuestStatus'
import { claimQuestReward } from '../../../../api/concero/quest/claimQuestReward'
import { useAppKit } from '@reown/appkit/react'
import { Stepper } from '../../../layout/Stepper/Stepper'
import { useAccount } from 'wagmi'
import { Address } from 'viem'

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
	const { open } = useAppKit()
	const { isConnected } = useAccount()
	const [rewardModalIsOpen, setRewardModalIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [points, setPoints] = useState<number>(0)
	const { name, description, rewards, steps, image } = quest

	const isDailyQuest = quest.type === QuestType.Daily

	const handleClaimReward = async () => {
		if (!user) return
		setIsLoading(true)

		try {
			const result = await claimQuestReward(quest._id, user.address as Address)

			if (result.points > 0) {
				setPoints(result.points)
				setRewardIsClaimed(true)
				setRewardModalIsOpen(true)
			}
		} catch (err) {
			console.error(err)
		}

		setIsLoading(false)
	}

	const addCompletedStep = (stepId: number) => {
		setCompletedStepIds([...completedStepIds, stepId])
	}

	const isQuestCompleted = completedStepIds.length === quest.steps.length

	const questImage = (
		<img
			className={classNames.questImage}
			height={192}
			src={
				quest.image
					? `${config.assetsURI}/icons/quests/${image}`
					: `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
			}
			onError={(e: any) => {
				e.target.src = `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
			}}
			alt="Quest image"
		/>
	)
	const isOpQuest = quest.name === 'Lancan OP'
	const isRepeat = isOpQuest ? false : !!getDateUnitMap(quest.type)
	const questTitle = (
		<div className="row gap-sm ac">
			<p className={`${classNames.category} body2`}>{isDailyQuest ? 'Daily' : categoryNameMap[quest.category]}</p>
			<QuestStatus
				isRepeat={isRepeat}
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
			<Stepper steps={steps.length} completedSteps={completedStepIds.length} />
			<div className="gap-xs">
				{steps.map(step => {
					return (
						<QuestStep
							isCompleted={completedStepIds.includes(+step.id)}
							addCompletedStep={addCompletedStep}
							quest={quest}
							user={user}
							step={step}
							key={step.id}
							isConnected={isConnected}
						/>
					)
				})}
			</div>
		</div>
	)

	const oneStep = (
		<QuestStep
			isCompleted={isQuestCompleted}
			addCompletedStep={addCompletedStep}
			quest={quest}
			user={user}
			mode="one"
			step={steps[0]}
			isConnected={isConnected}
		/>
	)

	if (rewardModalIsOpen) {
		const showRoleAlert = !!(quest.name === 'OG challenge ' || quest.name === 'Lancan GOAT Quest')
		return (
			<RewardModal
				points={points}
				show={rewardModalIsOpen}
				setShow={setRewardModalIsOpen}
				quest={quest}
				showRoleAlert={showRoleAlert}
			/>
		)
	}

	return (
		<Modal position="top" className={classNames.questModal} show={isOpen} setShow={setIsOpen} title={questTitle}>
			<div className={classNames.mainInfo}>
				<div className="w-full gap-md">
					<h2 className={classNames.title}>{name}</h2>
					{quest.subtitle && quest.name !== 'Lancardio' && (
						<h2 className={classNames.subtitle}>{quest.subtitle}</h2>
					)}
					<h6 className={classNames.points}>
						{rewards.points ? `${rewards.points} CERs` : ''} {rewards?.role ? '+ Role' : ''}
					</h6>
				</div>

				{questImage}

				<p className={`${classNames.description} body3`}>{description}</p>
			</div>

			{steps.length > 1 ? stepsGroup : oneStep}

			{!isConnected && (
				<div className="row w-full">
					<Button
						size="lg"
						onClick={async () => {
							await open()
						}}
					>
						Connect wallet
					</Button>
				</div>
			)}
			{isQuestCompleted && !rewardIsClaimed && (
				<Button size="lg" isLoading={isLoading} isDisabled={rewardIsClaimed} onClick={handleClaimReward}>
					Claim reward
				</Button>
			)}
		</Modal>
	)
}
