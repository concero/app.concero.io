import cls from './StepActions.module.pcss'
import { ProgressBar } from '@/components/layout/progressBar/ProgressBar'
import { TQuest, TQuestStep } from '@/entities/Quest'
import { TQuestActions } from '@/entities/Quest'
import { getIsStartedQuest, useAddStepInProgressMutation, useUserByAddress, useUserVolume } from '@/entities/User'
import { useAccount } from 'wagmi'
import { getDayRangeDates, getWeekRangeDates } from '@/utils/date/getRangeDates'
import { config } from '@/constants/config'
import { useVerifyQuestMutation } from '@/entities/Quest'
import { trackEvent } from '@/hooks/useTracking'
import { action, category } from '@/constants/tracking'
import { Button } from '@concero/ui-kit'
import { useState } from 'react'

export type TStepActionProps = {
	quest: TQuest
	step: TQuestStep
	setErrorText?: (text: string) => void
}
const StepActions: Record<TQuestActions, (props: TStepActionProps) => JSX.Element> = {
	ConnectSocialNetwork: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	ConnectGroup: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	Repost: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	CheckVolume: function (props: TStepActionProps): JSX.Element {
		const { step, quest, setErrorText } = props
		const { address } = useAccount()
		const { data: user } = useUserByAddress(address)
		const isDailyQuest = quest.type === 'Daily'
		const isWeeklyQuest = quest.type === 'Primary' || quest.type === 'Secondary'
		const isSingleStep = quest.steps.length == 1
		const { mutateAsync: verifyFn, isPending: isPendingVerify } = useVerifyQuestMutation()
		const { mutateAsync: addStepInProgress, isPending: isPendingAddStep } = useAddStepInProgressMutation()

		let startDate = quest.startDate
		let endDate = quest.endDate

		if (isDailyQuest) {
			const dates = getDayRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		} else if (isWeeklyQuest) {
			const dates = getWeekRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		}
		const { data: volume } = useUserVolume({
			address: user?.address,
			startDate,
			endDate,
			isCrossChain: step.options?.isCrossChain,
			chainIds: step.options?.chainIds,
		})
		const handleSwap = () => {
			window.open(config.lancanURL, '_blank')
		}
		const handleVerify = () => {
			if (quest && user && address) {
				verifyFn({
					address,
					questId: quest._id,
					stepId: step.id,
				})
					.then(res => {
						if (!res.status) {
							setErrorText?.(
								'You haven’t met the requirements for this task. Please complete it and try again.',
							)
							return
						}
						addStepInProgress({
							address,
							questId: quest._id,
							stepId: step.id,
						})
						trackEvent({
							category: category.QuestCard,
							action: action.SuccessQuest,
							label: 'concero_verify_quest_success',
							data: { id: quest._id, step },
						})
					})
					.catch(e => {
						trackEvent({
							category: category.QuestCard,
							action: action.FailedQuest,
							label: 'concero_verify_quest_fail',
							data: { id: quest._id, step },
						})
					})
				trackEvent({
					category: category.QuestCard,
					action: action.BeginQuest,
					label: 'concero_verify_quest_begin',
					data: { id: quest._id, step },
				})
			}
		}
		return (
			<>
				<ProgressBar
					type="float"
					currentValue={volume ?? Number(0)}
					maxValue={Number(step.options?.value)}
					minValue={0}
				/>
				<div className={cls.controls}>
					<Button variant={isSingleStep ? 'primary' : 'secondary_color'} onClick={handleSwap} size="l">
						Swap
					</Button>
					<Button
						variant={'tetrary_color'}
						onClick={handleVerify}
						isLoading={isPendingVerify || isPendingAddStep}
						size="l"
					>
						Verify
					</Button>
				</div>
			</>
		)
	},
	ProvideLiquidity: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
	LikeTweet: function (props: TStepActionProps): JSX.Element {
		const { step, quest, setErrorText } = props
		const { address } = useAccount()
		const { data: user } = useUserByAddress(address)
		const { mutateAsync: verifyFn, isPending: isPendingVerify } = useVerifyQuestMutation()
		const { mutateAsync: addStepInProgress, isPending: isPendingAddStep } = useAddStepInProgressMutation()
		const isSingleStep = quest.steps.length == 1
		const [isOpenedLink, setIsOpenedLink] = useState(false)
		const handleLink = () => {
			window.open(step.options?.link, '_blank')
			setTimeout(() => {
				setIsOpenedLink(true)
			}, 3000)
		}
		const handleVerify = () => {
			if (quest && user && address) {
				verifyFn({
					address,
					questId: quest._id,
					stepId: step.id,
				})
					.then(res => {
						if (!res.status) {
							setErrorText?.(
								'You haven’t met the requirements for this task. Please complete it and try again.',
							)
							return
						}
						addStepInProgress({
							address,
							questId: quest._id,
							stepId: step.id,
						})
						trackEvent({
							category: category.QuestCard,
							action: action.SuccessQuest,
							label: 'concero_verify_quest_success',
							data: { id: quest._id, step },
						})
					})
					.catch(e => {
						trackEvent({
							category: category.QuestCard,
							action: action.FailedQuest,
							label: 'concero_verify_quest_fail',
							data: { id: quest._id, step },
						})
					})
				trackEvent({
					category: category.QuestCard,
					action: action.BeginQuest,
					label: 'concero_verify_quest_begin',
					data: { id: quest._id, step },
				})
			}
		}
		return (
			<>
				<div className={cls.controls}>
					<Button variant={isSingleStep ? 'primary' : 'secondary_color'} onClick={handleLink} size="l">
						Open
					</Button>
					<Button
						isDisabled={!isOpenedLink}
						variant={isSingleStep ? 'secondary_color' : 'tetrary_color'}
						onClick={handleVerify}
						size="l"
						isLoading={isPendingVerify || isPendingAddStep}
					>
						Verify
					</Button>
				</div>
			</>
		)
	},
	ProvideFeedback: function (props: TStepActionProps): JSX.Element {
		const { step, quest, setErrorText } = props
		const { address } = useAccount()
		const { data: user } = useUserByAddress(address)
		const { mutateAsync: verifyFn, isPending: isPendingVerify } = useVerifyQuestMutation()
		const { mutateAsync: addStepInProgress, isPending: isPendingAddStep } = useAddStepInProgressMutation()
		const isSingleStep = quest.steps.length == 1
		const isStartedQuest = user ? getIsStartedQuest(quest._id, user) : false
		const [isOpenedLink, setIsOpenedLink] = useState(isStartedQuest)
		const handleLink = () => {
			window.open(step.options?.link, '_blank')
			setIsOpenedLink(true)
		}
		const handleVerify = () => {
			if (quest && user && address) {
				verifyFn({
					address,
					questId: quest._id,
					stepId: step.id,
				})
					.then(res => {
						if (!res.status) {
							setErrorText?.(
								'You haven’t met the requirements for this task. Please complete it and try again.',
							)
							return
						}
						addStepInProgress({
							address,
							questId: quest._id,
							stepId: step.id,
						})
						trackEvent({
							category: category.QuestCard,
							action: action.SuccessQuest,
							label: 'concero_verify_quest_success',
							data: { id: quest._id, step },
						})
					})
					.catch(e => {
						trackEvent({
							category: category.QuestCard,
							action: action.FailedQuest,
							label: 'concero_verify_quest_fail',
							data: { id: quest._id, step },
						})
					})
				trackEvent({
					category: category.QuestCard,
					action: action.BeginQuest,
					label: 'concero_verify_quest_begin',
					data: { id: quest._id, step },
				})
			}
		}
		return (
			<>
				<div className={cls.controls}>
					<Button variant={isSingleStep ? 'primary' : 'secondary_color'} onClick={handleLink} size="l">
						Open
					</Button>
					<Button
						isDisabled={!isOpenedLink}
						variant={isSingleStep ? 'secondary_color' : 'tetrary_color'}
						onClick={handleVerify}
						size="l"
						isLoading={isPendingVerify || isPendingAddStep}
					>
						Verify
					</Button>
				</div>
			</>
		)
	},
	RateExperience: function (props: TStepActionProps): JSX.Element {
		return <></>
	},
}

export { StepActions }
