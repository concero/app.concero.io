import { type Dispatch, type SetStateAction } from 'react'
import { Modal } from '../../../modals/Modal/Modal'
import { type IQuest } from '../../../../api/concero/quest/questType'
import { Button } from '../../../buttons/Button/Button'
import classNames from './QuestModal.module.pcss'
import { config } from '../../../../constants/config'

interface Props {
	show: boolean
	setShow: Dispatch<SetStateAction<boolean>>
	quest: IQuest
	points: number
}

export const RewardModal = ({ show, setShow, quest, points }: Props) => {
	const questImage = quest.image ? (
		<img
			className={classNames.questImage}
			height={128}
			src={`${config.assetsURI}/icons/quests/${quest.image}`}
			alt="Quest image"
		/>
	) : null

	return (
		<Modal isHeaderVisible={false} className={classNames.rewardModal} show={show} setShow={setShow}>
			{questImage}
			<h3>+ {points} CERs</h3>
			<h4>You finished “{quest.name}”!</h4>
			<Button
				onClick={() => {
					setShow(false)
				}}
				size="lg"
			>
				Done!
			</Button>
		</Modal>
	)
}
