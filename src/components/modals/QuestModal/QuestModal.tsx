import { Modal } from '../../modals/Modal/Modal'
import { Tag } from '../../tags/Tag/Tag'
import { Button } from '../../buttons/Button/Button'
import type { Dispatch, SetStateAction } from 'react'
import { type IQuest } from '../../../api/concero/quest/questType'
import classNames from './QuestModal.module.pcss'

interface QuestModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	quest: IQuest
	status: string
	isLaunched: boolean
}

export const QuestModal = ({ quest, isOpen, setIsOpen, status, isLaunched }: QuestModalProps) => {
	const { name, description, rewards } = quest

	return (
		<Modal className={classNames.questModal} show={isOpen} setShow={setIsOpen} title="Quest">
			<div className={classNames.header}>
				<div className="row jsb w-full">
					<h2>{name}</h2>
					<Tag size="sm" color={'recommended'}>
						+ {String(rewards.points)}xp
					</Tag>
				</div>
				<p className="body4">{description}</p>
				<Tag size="sm" color={isLaunched ? 'blue' : 'pink'}>
					{status}
				</Tag>
			</div>

			<div className="gap-md">
				<Button>Start</Button>
				<Button variant="secondary">Verify</Button>
			</div>
		</Modal>
	)
}
