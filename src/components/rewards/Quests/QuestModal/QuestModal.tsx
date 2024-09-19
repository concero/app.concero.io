import { Modal } from '../../../modals/Modal/Modal'
import { Tag } from '../../../tags/Tag/Tag'
import { Button } from '../../../buttons/Button/Button'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IQuest, type IQuestCondition } from '../../../../api/concero/quest/questType'
import classNames from './QuestModal.module.pcss'
import { verifyQuest } from './questVerifier'
import { type IUser } from '../../../../api/concero/user/userType'
import { TransactionStatus } from '../../../../api/concero/types'
import { QuestStatus } from '../QuestsGroup/getQuestStatus'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { QuestStep } from './QuestStep/QuestStep'

interface QuestModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	quest: IQuest
	status: string
	typeStatus: QuestStatus
	user: IUser | null | undefined
}

interface QuestModalCondition {
	quest: IQuest
	index: number
	condition: IQuestCondition
	user: IUser
}

export const QuestCondition = ({ quest, index, condition, user }: QuestModalCondition) => {
	const [txStatus, setTxStatus] = useState<TransactionStatus>(TransactionStatus.IDLE)
	const [points, setPoints] = useState(0)
	const [message, setMessage] = useState<string>('')
	const isDisabledButton = !user || txStatus === TransactionStatus.SUCCESS || txStatus === TransactionStatus.PENDING

	const handleVerifyQuest = async (condition: IQuestCondition) => {
		if (isDisabledButton) return

		try {
			setTxStatus(TransactionStatus.PENDING)

			const [questRes] = await Promise.all([
				verifyQuest(quest, condition, user),
				trackEvent({
					category: category.QuestCard,
					action: action.BeginQuest,
					label: 'concero_verify_quest_begin',
					data: { id: quest._id, name: quest.name },
				}),
			])

			if (questRes) {
				setTxStatus(TransactionStatus.SUCCESS)
				setPoints(questRes.points)

				if (questRes.communityRewardsMessage && questRes.discordRewardsMessage) {
					const rewardsMessage = questRes.communityRewardsMessage + '\n' + questRes.discordRewardsMessage
					setMessage(rewardsMessage)
				}
				await trackEvent({
					category: category.QuestCard,
					action: action.SuccessQuest,
					label: 'concero_verify_quest_success',
					data: { id: quest._id, name: quest.name },
				})
			} else {
				setTxStatus(TransactionStatus.FAILED)
			}
		} catch (error) {
			console.error(error)
			setTxStatus(TransactionStatus.FAILED)
			await trackEvent({
				category: category.QuestCard,
				action: action.FailedQuest,
				label: 'concero_verify_quest_fail',
				data: { id: quest._id, name: quest.name },
			})
		}
	}

	return (
		<div key={index} className="gap-md">
			<hr />
			<h4>
				{quest.conditions.length > 1 && index + 1 + '.'} {condition.description}
			</h4>
			{condition.link && (
				<a className="w-full" href={condition.link}>
					<Button className="w-full">Start quest</Button>
				</a>
			)}

			<Button
				isLoading={txStatus === TransactionStatus.PENDING}
				isDisabled={isDisabledButton}
				onClick={async () => {
					await handleVerifyQuest(condition)
				}}
				variant="secondary"
			>
				{(txStatus === TransactionStatus.IDLE || txStatus === TransactionStatus.PENDING) && 'Verify'}
				{txStatus === TransactionStatus.SUCCESS && `${points ? points.toFixed(1) : ''} CERs claimed`}
				{txStatus === TransactionStatus.FAILED && 'The quest has not been completed'}
			</Button>
			{txStatus === TransactionStatus.SUCCESS && message && <h4>{message}</h4>}
		</div>
	)
}

export const QuestModal = ({ quest, isOpen, setIsOpen, status, typeStatus, user }: QuestModalProps) => {
	const { name, description, rewards } = quest

	const passedQuest = user?.passedQuests.find(uQuest => uQuest.id === quest._id)

	// TODO change category
	const questTitle = (
		<div className="row gap-sm ac">
			<p className={`${classNames.category} body2`}>Socials</p>
			<Tag size="sm" variant="neutral">
				Started, 00 days left
			</Tag>
		</div>
	)

	return (
		<Modal className={classNames.questModal} show={isOpen} setShow={setIsOpen} title={questTitle}>
			<div className={classNames.mainInfo}>
				<div className="w-full gap-sm">
					<h2>{name}</h2>
					<h6 className={classNames.points}>+ 25 CERs</h6>
				</div>
				<p className={`${classNames.description} body3`}>{description}</p>
			</div>

			<div className="gap-sm">
				<div className="row ac jsb">
					<h6>Steps:</h6>
					<h6>0/4</h6>
				</div>
				<div className="gap-xs">
					<QuestStep />
					<QuestStep />
					<QuestStep />
					<QuestStep />
				</div>
			</div>

			{!passedQuest &&
				typeStatus === QuestStatus.GOING &&
				quest.conditions.map((condition, index) => {
					return <QuestCondition key={index} quest={quest} index={index} condition={condition} user={user} />
				})}
			{passedQuest ? <Button isDisabled={true}>{passedQuest.points.toFixed(1)} CERs claimed</Button> : null}
			{!user && <h4 className={classNames.warning}>Connect your wallet to claim the rewards</h4>}
		</Modal>
	)
}
