import { type Dispatch, type SetStateAction } from 'react'
import { Modal } from '../../../modals/Modal/Modal'
import { type IQuest } from '../../../../api/concero/quest/questType'
import { Button } from '../../../buttons/Button/Button'
import classNames from './QuestModal.module.pcss'
import { config } from '../../../../constants/config'
import { Alert } from '../../../layout/Alert/Alert'

interface Props {
	show: boolean
	setShow: Dispatch<SetStateAction<boolean>>
	quest: IQuest
	points: number
	showRoleAlert?: boolean
}

export const RewardModal = ({ show, setShow, quest, points, showRoleAlert }: Props) => {
	const questImage = (
		<div className={classNames.imageFrame}>
			<img
				className={`${classNames.questImage} ${quest.image ? '' : classNames.placeholderImage}`}
				src={
					quest.image
						? `${config.assetsURI}/icons/quests/${quest.image}`
						: `${config.assetsURI}/icons/quests/QuestRewardPlaceholder.webp`
				}
				onError={(e: any) => {
					e.target.src = `${config.assetsURI}/icons/quests/QuestRewardPlaceholder.webp`
				}}
				alt="Quest image"
			/>
		</div>
	)

	return (
		<Modal isHeaderVisible={false} className={classNames.rewardModal} show={show} setShow={setShow}>
			{questImage}
			<h3>+ {points} CERs</h3>
			<h4>For completing “{quest.name}”!</h4>
			{showRoleAlert && (
				<Alert
					title="Role Coming This Week!"
					subtitle="Your Discord role will be assigned automatically by the end of the week"
				/>
			)}
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
