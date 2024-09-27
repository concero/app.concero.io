import { Button } from '../../../../buttons/Button/Button'
import classNames from './QuestStep.module.pcss'
import { Tag } from '../../../../tags/Tag/Tag'
import {
	type IQuestStep,
	OnChainSource,
	QuestCategory,
	QuestSocialAction,
	SocialSource,
	VerificationStatus,
} from '../../../../../api/concero/quest/questType'
import { useEffect, useState } from 'react'
import { trackEvent } from '../../../../../hooks/useTracking'
import { action, category } from '../../../../../constants/tracking'
import { type IUser } from '../../../../../api/concero/user/userType'
import { verifyQuest } from '../../../../../api/concero/quest/verifyQuest'

type StepMode = 'group' | 'one'

export interface Props {
	step: IQuestStep
	user: IUser | null | undefined
	questId: string
	mode?: StepMode
	addCompletedStep: (id: number) => void
	isCompleted?: boolean
}

const defaultStartQuestLinkMap: Record<any, string> = {
	[OnChainSource.INFRA]: 'https://lanca.io',
	[OnChainSource.POOL]: 'https://app.concero.io/pool',
	[SocialSource.DISCORD]: 'https://discord.com/channels/1155792755105214535',
	[SocialSource.TWITTER]: 'https://x.com/concero_io',
}

interface ButtonStepStyle {
	size?: 'sm' | 'lg'
	startButton: {
		text: 'Start step' | 'Start quest'
		variant: 'primary' | 'secondaryColor' | 'tetraryColor'
	}
	verifyButton: {
		text: 'Verify step' | 'Verify quest'
		variant: 'tetraryColor' | 'secondaryColor' | 'primary'
	}
}

const buttonsStyle: Record<StepMode, ButtonStepStyle> = {
	group: {
		size: 'sm',
		startButton: {
			text: 'Start step',
			variant: 'secondaryColor',
		},
		verifyButton: {
			text: 'Verify step',
			variant: 'tetraryColor',
		},
	},
	one: {
		size: 'lg',
		startButton: {
			text: 'Start quest',
			variant: 'primary',
		},
		verifyButton: {
			text: 'Verify quest',
			variant: 'secondaryColor',
		},
	},
}

export const QuestStep = ({ step, mode = 'group', user, questId, addCompletedStep, isCompleted }: Props) => {
	const currentStatus = isCompleted ? VerificationStatus.SUCCESS : VerificationStatus.NOT_STARTED

	const [linkIsVisited, setLinkIsVisited] = useState<boolean>(false)
	const [buttonState, setButtonState] = useState<ButtonStepStyle>(buttonsStyle[mode])
	const [verifyStatus, setVerifyStatus] = useState<VerificationStatus>(currentStatus)

	const startQuestLink = step?.options?.link ? step.options.link : defaultStartQuestLinkMap[step.source]

	useEffect(() => {
		if (linkIsVisited) {
			const newButtonState: ButtonStepStyle = {
				...buttonState,
				startButton: { ...buttonState.startButton, variant: 'tetraryColor' },
				verifyButton: { ...buttonState.verifyButton, variant: 'primary' },
			}

			setButtonState(newButtonState)
		}
	}, [linkIsVisited])

	const handleVerifyQuest = async () => {
		if (!user || !step) return

		const isConnectNetwork = step.questAction === QuestSocialAction.ConnectSocialNetwork

		if (step.category === QuestCategory.Socials && !linkIsVisited && !isConnectNetwork) {
			setVerifyStatus(VerificationStatus.FAILED)
			return
		}

		try {
			setVerifyStatus(VerificationStatus.PENDING)

			const [questRes] = await Promise.all([
				verifyQuest(questId, step.id, user._id),
				trackEvent({
					category: category.QuestCard,
					action: action.BeginQuest,
					label: 'concero_verify_quest_begin',
					data: { id: questId, step },
				}),
			])

			if (questRes.status) {
				addCompletedStep(+step.id)
				setVerifyStatus(VerificationStatus.SUCCESS)
				await trackEvent({
					category: category.QuestCard,
					action: action.SuccessQuest,
					label: 'concero_verify_quest_success',
					data: { id: questId, step },
				})
			} else {
				setVerifyStatus(VerificationStatus.FAILED)
			}
		} catch (error) {
			console.error(error)
			setVerifyStatus(VerificationStatus.FAILED)
			await trackEvent({
				category: category.QuestCard,
				action: action.FailedQuest,
				label: 'concero_verify_quest_fail',
				data: { id: questId, step },
			})
		}
	}

	const handleStartQuest = () => {
		if (!startQuestLink || startQuestLink.length === 0) return

		setLinkIsVisited(true)
		window.open(startQuestLink, '_blank')
	}

	if (verifyStatus === VerificationStatus.SUCCESS) {
		return (
			<div className={classNames.containerSuccessState}>
				<h4>{step.title}</h4>
				<Tag size="md" variant="positive">
					Done!
				</Tag>
			</div>
		)
	}

	const actionButtons = (
		<div className="gap-sm">
			<div className="gap-sm row">
				<Button onClick={handleStartQuest} size={buttonState.size} variant={buttonState.startButton.variant}>
					{buttonState.startButton.text}
				</Button>
				<Button
					onClick={handleVerifyQuest}
					isLoading={verifyStatus === VerificationStatus.PENDING}
					size={buttonState.size}
					variant={buttonState.verifyButton.variant}
				>
					{buttonState.verifyButton.text}
				</Button>
			</div>
			{verifyStatus === VerificationStatus.FAILED && (
				<p className={`${classNames.error} body2`}>
					You haven’t met the requirements for this task. Please complete it and try again.
				</p>
			)}
		</div>
	)

	if (mode === 'one') {
		return user && actionButtons
	}

	return (
		<div className={classNames.container}>
			<div className="gap-xs">
				<h4>{step.title}</h4>
				<p className="body2">{step.description}</p>
			</div>
			{user && actionButtons}
		</div>
	)
}
