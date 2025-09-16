import cls from './QuestCard.module.pcss'
import { ConnectWallet } from '@/features/Auth'
import { TQuest, TQuestCardStatus, TUserQuest } from '@/entities/Quest'
import { ClaimReward, StartQuest } from '@/features/Quest'
import { useTheme } from '@concero/ui-kit'
import { action, category } from '@/constants/tracking'
import { trackEvent } from '@/hooks/useTracking'
import { getEventTypeQuest } from '@/shared/lib/utils/events/getEventTypeQuest'
import { useAccount } from 'wagmi'
import { getIsCanClaimQuest } from '@/entities/User'
import { QuestTaskGroup } from '@/features/Quest'
import { configEnvs } from '@/shared/consts/config/config'
import { AppImage } from '@/shared/ui/AppImage'

import QuestPlaceholder from '@/shared/assets/images/quest/QuestPlaceholder.webp'
import { HStack } from '@/shared/ui/Stack'
type TProps = {
	quest: TQuest
	userQuest?: TUserQuest
	onClaim?: (quest: TQuest) => void
}

export const QuestCard = (props: TProps) => {
	const { quest, userQuest, onClaim } = props
	const { theme } = useTheme()
	const { address } = useAccount()
	let controls = null
	let showTasks = false
	let showOnlyOptionalSteps = false
	const handleEventPosthogOnStart = async (quest: TQuest) => {
		await trackEvent({
			category: category.QuestCard,
			action: action.BeginQuest,
			label: 'concero_quest_begin',
			data: { id: quest.id, type: getEventTypeQuest(quest as TQuest) },
		})
	}

	const rewardIsClaimed = !!userQuest?.finished_at
	let statusOfQuest: TQuestCardStatus = address ? 'READY_TO_START' : 'NOT_CONNECT'

	if (userQuest?.started_at) {
		statusOfQuest = 'STARTED'
	}
	if (userQuest && getIsCanClaimQuest({ quest, userQuest })) {
		statusOfQuest = 'READY_TO_CLAIM'
	}

	if (rewardIsClaimed) {
		statusOfQuest = 'FINISHED'
	}

	switch (statusOfQuest) {
		case 'NOT_CONNECT':
			controls = <ConnectWallet />
			showTasks = false
			break
		case 'READY_TO_START':
			controls = (
				<StartQuest
					questId={quest.id}
					onStart={() => handleEventPosthogOnStart(quest)}
					propsButton={{ size: 'l', isFull: false }}
				/>
			)
			showTasks = false
			break
		case 'STARTED':
			controls = null
			showTasks = true
			showOnlyOptionalSteps = false
			break
		case 'READY_TO_CLAIM':
			if (userQuest) {
				controls = (
					<ClaimReward
						userQuestId={userQuest?.id}
						onClaim={() => onClaim?.(quest)}
						propsButton={{ size: 'l' }}
					/>
				)
				showTasks = true
				showOnlyOptionalSteps = true
			}
			break
		case 'FINISHED':
			controls = null
			showTasks = false
			break
		default:
			showTasks = false
			controls = null
	}
	return (
		<div className={cls.quest_card}>
			<div className={cls.header}>
				<div className={cls.title}>{quest.title}</div>
				{quest.subtitle ? <div className={cls.subtitle}>{quest.subtitle}</div> : ''}
				<HStack gap="space_0_5" className={cls.reward_points}>
					+{' '}
					{Math.max(
						quest.quest_reward.tokenReward?.min_value ?? 0,
						quest.quest_reward.tokenReward?.max_value ?? 0,
					)}
					<span>CERs</span>
				</HStack>
			</div>

			<div className={cls.image_wrap}>
				{quest.image ? (
					<AppImage
						src={`${configEnvs.assetsURI}/quests/${theme == 'dark' ? 'dark_' : ''}${quest.image}`}
						alt="Quest image"
						fallbackSrc={QuestPlaceholder}
						retryTimeout={5000}
					/>
				) : (
					<AppImage
						src={QuestPlaceholder}
						alt="Quest image"
						fallbackSrc={QuestPlaceholder}
						retryTimeout={5000}
					/>
				)}
			</div>

			<div className={cls.description}>{quest.description}</div>
			{showTasks && <QuestTaskGroup quest={quest} userQuest={userQuest} onlyOptional={showOnlyOptionalSteps} />}
			{controls ? <div className={cls.controls}>{controls}</div> : null}
		</div>
	)
}
