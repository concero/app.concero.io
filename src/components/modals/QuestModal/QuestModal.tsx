import { Modal } from '../Modal/Modal'
import { Tag } from '../../tags/Tag/Tag'
import { Button } from '../../buttons/Button/Button'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type IQuest, type QuestCondition, QuestConditionType } from '../../../api/concero/quest/questType'
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

export const QuestModal = ({ quest, isOpen, setIsOpen, status, typeStatus, user }: QuestModalProps) => {
	const [txStatus, setTxStatus] = useState<TransactionStatus>(TransactionStatus.IDLE)
	const [points, setPoints] = useState(0)
	const { name, description, rewards } = quest

	const passedQuest = user?.passedQuests.find(uQuest => uQuest.id === quest._id)
	const isDisabledButton = !user || txStatus === TransactionStatus.SUCCESS || txStatus === TransactionStatus.PENDING

	const handleVerifyQuest = async (condition: QuestCondition) => {
		if (isDisabledButton) return

		try {
			setTxStatus(TransactionStatus.PENDING)

			const currentPoints = await verifyQuest(quest, condition, user)
			if (currentPoints) {
				setTxStatus(TransactionStatus.SUCCESS)
				setPoints(currentPoints)
			} else {
				setTxStatus(TransactionStatus.FAILED)
			}
		} catch (error) {
			setTxStatus(TransactionStatus.FAILED)
		}
	}

	return (
		<Modal className={classNames.questModal} show={isOpen} setShow={setIsOpen} title="Quest">
			<div className={classNames.header}>
				<div className="row jsb w-full">
					<h2>{name}</h2>
					<div className="gap-sm row">
						{!!rewards.booster && (
							<Tag size="sm" color={'recommended'}>
								x{String(rewards.booster)} multiplier
							</Tag>
						)}
						{!!rewards.points && (
							<Tag size="sm" color={'recommended'}>
								+{String(rewards.points)} xp
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
					Start soon
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
					return (
						<div key={index} className="gap-md">
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
								{(txStatus === TransactionStatus.IDLE || txStatus === TransactionStatus.PENDING) &&
									'Verify'}
								{txStatus === TransactionStatus.SUCCESS && `${points.toFixed(1)} CERs claimed`}
								{txStatus === TransactionStatus.FAILED && "Нow didn't complete the quest"}
							</Button>
						</div>
					)
				})}
			{passedQuest && <Button isDisabled={true}>{passedQuest.points.toFixed(1)} CERs claimed</Button>}
			{!user && <h4 className={classNames.warning}>Connect your wallet to claim the rewards</h4>}
		</Modal>
	)
}
