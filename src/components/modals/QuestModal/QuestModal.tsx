import { Modal } from '../Modal/Modal'
import { Tag } from '../../tags/Tag/Tag'
import { Button } from '../../buttons/Button/Button'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IQuest, type IQuestCondition, QuestConditionType } from '../../../api/concero/quest/questType'
import classNames from './QuestModal.module.pcss'
import { verifyQuest } from './questVerifier'
import { type IUser } from '../../../api/concero/user/userType'
import { TransactionStatus } from '../../../api/concero/types'
import { QuestStatus } from '../../cards/QuestsCard/getQuestStatus'

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

			const currentPoints = await verifyQuest(quest, condition, user)
			if (currentPoints) {
				setTxStatus(TransactionStatus.SUCCESS)
				setPoints(currentPoints.points!)

				if (currentPoints.message) {
					setMessage(currentPoints.message)
				}
			} else {
				setTxStatus(TransactionStatus.FAILED)
			}
		} catch (error) {
			setTxStatus(TransactionStatus.FAILED)
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
				{txStatus === TransactionStatus.SUCCESS && `${!!points && points.toFixed(1)} CERs claimed`}
				{txStatus === TransactionStatus.FAILED && 'The quest has not been completed'}
			</Button>
			{txStatus === TransactionStatus.SUCCESS && message && <h4>{message}</h4>}
		</div>
	)
}

export const QuestModal = ({ quest, isOpen, setIsOpen, status, typeStatus, user }: QuestModalProps) => {
	const { name, description, rewards } = quest

	const passedQuest = user?.passedQuests.find(uQuest => uQuest.id === quest._id)

	return (
		<Modal className={classNames.questModal} show={isOpen} setShow={setIsOpen} title="Quest">
			<div className={classNames.header}>
				<div className="row jsb w-full">
					<h2>{name}</h2>
					<div className="gap-sm row">
						{!!rewards?.booster && (
							<Tag size="sm" color={'recommended'}>
								x{String(rewards.booster)} multiplier
							</Tag>
						)}
						{!!rewards?.points && (
							<Tag size="sm" color={'recommended'}>
								+{String(rewards.points)} CERs
							</Tag>
						)}
						{quest.conditions[0].type === QuestConditionType.ProvideLiquidity && (
							<Tag size="sm" color={'recommended'}>
								CERs Based on LP
							</Tag>
						)}
					</div>
				</div>
				<p className="body4">{description}</p>
				<Tag size="sm" color={typeStatus === QuestStatus.LAUNCH ? 'pink' : 'blue'}>
					{status}
				</Tag>
			</div>

			{typeStatus === QuestStatus.LAUNCH && (
				<Button variant="convex" isDisabled={true} className={classNames.warning}>
					Starts soon
				</Button>
			)}
			{typeStatus === QuestStatus.FINISHED && (
				<Button variant="convex" isDisabled={true} className={classNames.warning}>
					Quest ended
				</Button>
			)}

			{!passedQuest &&
				typeStatus === QuestStatus.GOING &&
				quest.conditions.map((condition, index) => {
					return <QuestCondition key={index} quest={quest} index={index} condition={condition} user={user} />
				})}
			{passedQuest && <Button isDisabled={true}>{passedQuest.points.toFixed(1)} CERs claimed</Button>}
			{!user && <h4 className={classNames.warning}>Connect your wallet to claim the rewards</h4>}
		</Modal>
	)
}
