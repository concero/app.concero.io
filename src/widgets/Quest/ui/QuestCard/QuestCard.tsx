import { config } from '@/constants/config'
import cls from './QuestCard.module.pcss'
import { ConnectWallet } from '@/features/Auth'
import { TQuest, TQuestCardStatus } from '@/entities/Quest'
import { QuestStepGroup } from '@/features/Quest'
import { ClaimReward } from '@/features/Quest'
import { StartQuest } from '@/features/Quest'

type TProps = {
	quest: TQuest
	status: TQuestCardStatus
	onClaim?: () => void
}

export const QuestCard = (props: TProps) => {
	const { quest, status, onClaim } = props
	let controls = null
	let showSteps = false
	let showOnlyOptionalSteps = false
	switch (status) {
		case 'NOT_CONNECT':
			controls = <ConnectWallet />
			showSteps = false
			break
		case 'READY_TO_START':
			controls = <StartQuest questId={quest._id} propsButton={{ size: 'l', isFull: false }} />
			showSteps = false
			break
		case 'STARTED':
			controls = null
			showSteps = true
			showOnlyOptionalSteps = false
			break
		case 'READY_TO_CLAIM':
			controls = <ClaimReward questId={quest._id} onClaim={onClaim} propsButton={{ size: 'l' }} />
			showSteps = true
			showOnlyOptionalSteps = true
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
			{showSteps && <QuestStepGroup quest={quest} onlyOptional={showOnlyOptionalSteps} />}
			{controls ? <div className={cls.controls}>{controls}</div> : null}
		</div>
	)
}
