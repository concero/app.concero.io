import { TQuest, TQuestTask, TTaskType, TUserQuest } from '@/entities/Quest'
import { Button } from '@concero/ui-kit'
import cls from './TaskAction.module.pcss'
import { useState } from 'react'
import { useVerifyQuest } from '../../model/hooks/useVerifyQuest'
import { getDayRangeDates, getWeekRangeDates } from '@/utils/date/getRangeDates'
import { useUserByAddress, useUserVolume } from '@/entities/User'
import { useAccount } from 'wagmi'
import { configEnvs } from '@/shared/consts/config/config'
import { ProgressBar } from '@/components/layout/progressBar/ProgressBar'
import { useUserCountTx } from '@/entities/User/api/userApi'
import { roundDownToPrecision } from '@/shared/lib/utils/number'
import dayjs from 'dayjs'
export type TTaskActionProps = {
	quest: TQuest
	task: TQuestTask
	userQuest: TUserQuest
	onSuccessVerify: () => void
	onStartVerify: () => void
	setErrorText?: (text: string) => void
}

export const TaskActions: Record<TTaskType, (props: TTaskActionProps) => JSX.Element> = {
	like_x: function (props: TTaskActionProps): JSX.Element {
		const { quest, task, userQuest, setErrorText, onSuccessVerify, onStartVerify } = props
		const { handleVerifyQuest, isPending } = useVerifyQuest()
		const [isOpenedLink, setIsOpenedLink] = useState(false)
		const isSingleTask = quest.tasks.length == 1
		if (__IS_DEV__ && task.steps.length > 1) {
			console.warn(`DEVELOPER!!! Expected 1 Step, but given  ${task.steps.length} steps `)
		}
		const step = task.steps[0]
		const userStep = userQuest.steps.find(userStep => userStep.stepId === task.steps[0].id)
		const handleLink = () => {
			window.open(step.details.link, '_blank')
			setTimeout(() => {
				setIsOpenedLink(true)
			}, 3000)
		}

		const handleVerify = () => {
			if (userStep) {
				onStartVerify()
				handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
			}
		}
		return (
			<>
				<div className={cls.controls}>
					<Button variant={isSingleTask ? 'primary' : 'secondary_color'} onClick={handleLink} size="l">
						Open
					</Button>
					<Button
						isDisabled={!isOpenedLink}
						variant={isSingleTask ? 'secondary_color' : 'tetrary_color'}
						onClick={handleVerify}
						size="l"
						isLoading={isPending}
					>
						Verify
					</Button>
				</div>
			</>
		)
	},
	/**@deprecated */
	progress_line: function (props: TTaskActionProps): JSX.Element {
		const { quest, setErrorText, userQuest, onStartVerify, onSuccessVerify, task } = props
		const { address } = useAccount()
		const { data: userResponse } = useUserByAddress(address)
		const step = task.steps[0]
		const userStep = userQuest.steps.find(userStep => userStep.stepId === task.steps[0].id)
		const isDailyQuest = quest.interval === 'daily'
		const isWeeklyQuest = quest.interval === 'weekly'
		const isSingleTask = quest.tasks.length == 1
		const { handleVerifyQuest, isPending } = useVerifyQuest()
		const handleVerify = () => {
			if (userStep) {
				onStartVerify()
				handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
			}
		}
		const handleSwap = () => {
			window.open(step.details.link ?? configEnvs.lancanURL, '_blank')
		}
		let startDate = userQuest.started_at
		let endDate = quest.finished_at
		if (isDailyQuest) {
			const dates = getDayRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		} else if (isWeeklyQuest) {
			const dates = getWeekRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		}

		const { data: volumeResponse } = useUserVolume({
			address: userResponse?.payload?.address,
			from: startDate,
			to: endDate,
			isCrossChain: step.details.isCrossChain,
			isTestnet: step.details.isTestnet,
			fromChainIds: step.details.fromChainIds,
			toChainIds: step.details.toChainIds,
		})

		if (__IS_DEV__ && typeof step?.details?.value !== 'string' && typeof step?.details?.value !== 'number') {
			console.warn('DEVELOPER!!!  step?.details?.value is not a number or string')
		}
		return (
			<>
				<ProgressBar
					type="float"
					currentValue={volumeResponse?.payload?.volumeUSD ?? Number(0)}
					maxValue={Number(step?.details?.value)}
					minValue={0}
				/>
				<div className={cls.controls}>
					<Button variant={isSingleTask ? 'primary' : 'secondary_color'} onClick={handleSwap} size="l">
						Swap
					</Button>
					<Button variant={'tetrary_color'} onClick={handleVerify} isLoading={isPending} size="l">
						Verify
					</Button>
				</div>
			</>
		)
	},
	check_volume: function (props: TTaskActionProps): JSX.Element {
		const { quest, setErrorText, userQuest, onStartVerify, onSuccessVerify, task } = props
		const { address } = useAccount()
		const { data: userResponse } = useUserByAddress(address)
		const step = task.steps[0]
		const userStep = userQuest.steps.find(userStep => userStep.stepId === task.steps[0].id)
		const isDailyQuest = quest.interval === 'daily'
		const isWeeklyQuest = quest.interval === 'weekly'
		const isSingleTask = quest.tasks.length == 1
		const { handleVerifyQuest, isPending } = useVerifyQuest()
		const handleVerify = () => {
			if (userStep) {
				onStartVerify()
				handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
			}
		}
		const handleSwap = () => {
			window.open(step.details.link ?? configEnvs.lancanURL, '_blank')
		}
		let startDate = userQuest.started_at
		let endDate = dayjs().unix()
		// if (isDailyQuest) {
		// 	const dates = getDayRangeDates()
		// 	startDate = dates.startDate
		// 	endDate = dates.endDate
		// } else if (isWeeklyQuest) {
		// 	const dates = getWeekRangeDates()
		// 	startDate = dates.startDate
		// 	endDate = dates.endDate
		// }

		const { data: volumeResponse } = useUserVolume({
			address: userResponse?.payload?.address,
			from: startDate,
			to: endDate,
			isCrossChain: step.details.isCrossChain,
			isTestnet: step.details.isTestnet,
			fromChainIds: step.details.fromChainIds,
			toChainIds: step.details.toChainIds,
		})

		if (__IS_DEV__ && typeof step?.details?.value !== 'string' && typeof step?.details?.value !== 'number') {
			console.warn('DEVELOPER!!!  step?.details?.value is not a number or string')
		}
		return (
			<>
				<ProgressBar
					type="float"
					currentValue={
						roundDownToPrecision(
							volumeResponse?.payload?.volumeUSD ?? 0,
							Number(step?.details?.value) ?? 0,
						) ?? Number(0)
					}
					maxValue={Number(step?.details?.value)}
					minValue={0}
				/>
				<div className={cls.controls}>
					<Button variant={isSingleTask ? 'primary' : 'secondary_color'} onClick={handleSwap} size="l">
						Swap
					</Button>
					<Button variant={'tetrary_color'} onClick={handleVerify} isLoading={isPending} size="l">
						Verify
					</Button>
				</div>
			</>
		)
	},
	check_count_tx: function (props: TTaskActionProps): JSX.Element {
		const { quest, setErrorText, userQuest, onStartVerify, onSuccessVerify, task } = props
		const { address } = useAccount()
		const { data: userResponse } = useUserByAddress(address)
		const step = task.steps[0]
		const userStep = userQuest.steps.find(userStep => userStep.stepId === task.steps[0].id)
		const isDailyQuest = quest.interval === 'daily'
		const isWeeklyQuest = quest.interval === 'weekly'
		const isSingleTask = quest.tasks.length == 1
		const { handleVerifyQuest, isPending } = useVerifyQuest()
		const handleVerify = () => {
			if (userStep) {
				onStartVerify()
				handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
			}
		}
		const handleSwap = () => {
			window.open(step.details.link ?? configEnvs.lancanURL, '_blank')
		}
		let startDate = quest.started_at
		let endDate = quest.finished_at
		if (isDailyQuest) {
			const dates = getDayRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		} else if (isWeeklyQuest) {
			const dates = getWeekRangeDates()
			startDate = dates.startDate
			endDate = dates.endDate
		}

		const { data: countResponse } = useUserCountTx({
			address: userResponse?.payload?.address,
			from: startDate,
			to: endDate,
			isCrossChain: step.details.isCrossChain,
			isTestnet: step.details.isTestnet,
			fromChainIds: step.details.fromChainIds,
			toChainIds: step.details.toChainIds,
		})
		const probablyCount = countResponse?.payload.count || 0

		const stepValue = Number(step.details?.value)
		const probablyStepValue = stepValue ? (isNaN(stepValue) ? 0 : stepValue) : 0

		if (probablyCount >= probablyStepValue) {
			handleVerify()
		}

		if (__IS_DEV__ && typeof step?.details?.value !== 'string' && typeof step?.details?.value !== 'number') {
			console.warn('DEVELOPER!!! step?.details?.value is not a number or string')
		}
		return (
			<>
				<ProgressBar
					type="float"
					currentValue={countResponse?.payload?.count ?? Number(0)}
					maxValue={Number(step?.details?.value)}
					minValue={0}
				/>
				<div className={cls.controls}>
					<Button variant={isSingleTask ? 'primary' : 'secondary_color'} onClick={handleSwap} size="l">
						Swap
					</Button>
					<Button variant={'tetrary_color'} onClick={handleVerify} isLoading={isPending} size="l">
						Verify
					</Button>
				</div>
			</>
		)
	},
	connect_discord: function (props: TTaskActionProps): JSX.Element {
		const { quest, task, userQuest, setErrorText, onSuccessVerify, onStartVerify } = props
		const { handleVerifyQuest, isPending } = useVerifyQuest()
		if (__IS_DEV__ && task.steps.length > 1) {
			console.warn(`DEVELOPER!!! Expected 1 Step, but given  ${task.steps.length} steps `)
		}
		const step = task.steps[0]
		const userStep = userQuest.steps.find(userStep => userStep.stepId === task.steps[0].id)
		const isSingleTask = quest.tasks.length == 1
		const handleVerify = () => {
			if (userStep) {
				onStartVerify()
				handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
			}
		}
		return (
			<>
				<div className={cls.controls}>connect_discord</div>
			</>
		)
	},
	connect_x: function (props: TTaskActionProps): JSX.Element {
		const { quest, task, userQuest, setErrorText, onSuccessVerify, onStartVerify } = props
		const { handleVerifyQuest, isPending } = useVerifyQuest()
		if (__IS_DEV__ && task.steps.length > 1) {
			console.warn(`DEVELOPER!!! Expected 1 Step, but given  ${task.steps.length} steps `)
		}
		const step = task.steps[0]
		const userStep = userQuest.steps.find(userStep => userStep.stepId === task.steps[0].id)
		const isSingleTask = quest.tasks.length == 1
		const handleVerify = () => {
			if (userStep) {
				onStartVerify()
				handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
			}
		}
		return (
			<>
				<div className={cls.controls}>connect_x</div>
			</>
		)
	},
	connect_email: function (props: TTaskActionProps): JSX.Element {
		return <span>connect_email</span>
	},
	input: function (props: TTaskActionProps): JSX.Element {
		return <span>input</span>
	},
	textarea: function (props: TTaskActionProps): JSX.Element {
		return <span>textarea</span>
	},
	rate: function (props: TTaskActionProps): JSX.Element {
		return <span>rate</span>
	},
	google_form: function (props: TTaskActionProps): JSX.Element {
		const { quest, task, userQuest, setErrorText, onSuccessVerify, onStartVerify } = props
		const { handleVerifyQuest, isPending } = useVerifyQuest()
		const isStartedQuest = !!userQuest.started_at
		const [isOpenedLink, setIsOpenedLink] = useState<boolean>(isStartedQuest)

		if (__IS_DEV__ && task.steps.length > 1) {
			console.warn(`DEVELOPER!!! Expected 1 Step, but given  ${task.steps.length} steps `)
		}
		const step = task.steps[0]
		const userStep = userQuest.steps.find(userStep => userStep.stepId === task.steps[0].id)
		const isSingleTask = quest.tasks.length == 1
		const handleVerify = () => {
			if (userStep) {
				onStartVerify()
				handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
			}
		}
		const handleLink = () => {
			window.open(step.details?.link, '_blank')
			setIsOpenedLink(true)
		}
		return (
			<>
				<div className={cls.controls}>
					<Button variant={isSingleTask ? 'primary' : 'secondary_color'} onClick={handleLink} size="l">
						Open Form
					</Button>
					<Button
						isDisabled={!isOpenedLink}
						variant={isSingleTask ? 'secondary_color' : 'tetrary_color'}
						onClick={handleVerify}
						size="l"
						isLoading={isPending}
					>
						Verify
					</Button>
				</div>
			</>
		)
	},
}
