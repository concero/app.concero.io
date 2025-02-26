import { config } from '@/constants/config'
import { TQuest, TQuestStep } from '../../model/types/response'
import cls from './QuestCard.module.pcss'
import { Button } from '@/components/buttons/Button/Button'
import { QuestStepGroup } from '../../../../features/Quest/ui/QuestStepGroup/QuestStepGroup'
import { TQuestCardStatus } from '../../model/types/schema'
import { ConnectWallet } from '@/features/Auth'

type TProps = {
	quest: TQuest
	status: TQuestCardStatus
	onStart?: () => void
	onClaim?: () => void
	StepsSlot: JSX.Element
}

export const QuestCard = (props: TProps) => {
	const { quest, status, onStart, StepsSlot } = props
	let controls = null
	let showSteps = false
	switch (status) {
		case 'NOT_CONNECT':
			controls = <ConnectWallet />
			showSteps = false
			break
		case 'READY_TO_START':
			controls = <Button onClick={onStart}>Start Quest</Button>
			showSteps = false
			break
		case 'STARTED':
			controls = null
			showSteps = true
			break
		case 'READY_TO_CLAIM':
			controls = <Button>Claim</Button>
			showSteps = true
			break
		case 'FINISHED':
			controls = null
			showSteps = false
			break
		default:
			showSteps = false
			controls = null
	}
	return (
		<div className={cls.quest_card}>
			<div className={cls.header}>
				<div className={cls.title}>{quest.name}</div>
				<div className={cls.subtitle}>{quest.subtitle}</div>
				<div className={cls.reward_points}>+ {quest.rewards.points} CERs</div>
			</div>

			<div className={cls.image_wrap}>
				<img
					width={'100%'}
					src={
						quest.image
							? `${config.assetsURI}/icons/quests/${quest.image}`
							: `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
					}
					onError={(e: any) => {
						e.target.src = `${config.assetsURI}/icons/quests/QuestPlaceholder.webp`
					}}
					loading="lazy"
					alt="Quest image"
				/>
			</div>

			<div className={cls.description}>{quest.description}</div>
			{showSteps && StepsSlot}
			<div className={cls.controls}>{controls}</div>
		</div>
	)
}
