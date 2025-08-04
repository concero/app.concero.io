import { TQuest, TQuestStep, TQuestTask, TTaskType, TUserQuest, TUserStep } from '@/entities/Quest'
import { Button } from '@concero/ui-kit'
import cls from './TaskAction.module.pcss'
import { useState } from 'react'
import { useVerifyQuest } from '../../model/hooks/useVerifyQuest'
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
	progress_line: function (props: TTaskActionProps): JSX.Element {
		// const { quest, setErrorText, userQuest, onStartVerify, onSuccessVerify, task } = props
		// const { address } = useAccount()
		// const { data: userResponse } = useUserByAddress(address)
		// let step: TQuestStep | null = null
		// for (const task of quest.tasks) {
		// 	for (const stepItem of task.steps) {
		// 		if (stepItem.id === userStep.id) {
		// 			step = stepItem
		// 			break
		// 		}
		// 	}
		// }
		// const isDailyQuest = quest.interval === 'daily'
		// const isWeeklyQuest = quest.interval === 'weekly'
		// const isSingleTask = quest.tasks.length == 1
		// const { handleVerifyQuest, isPending } = useVerifyQuest()
		// const handleVerify = () => {
		// 	if (userStep) {
		// 		onStartVerify()
		// 		handleVerifyQuest({ onSuccessVerify, setErrorText, userQuest, userStep })
		// 	}
		// }
		// let startDate = quest.started_at
		// let endDate = quest.finished_at
		// if (isDailyQuest) {
		// 	const dates = getDayRangeDates()
		// 	startDate = dates.startDate
		// 	endDate = dates.endDate
		// } else if (isWeeklyQuest) {
		// 	const dates = getWeekRangeDates()
		// 	startDate = dates.startDate
		// 	endDate = dates.endDate
		// }
		// const { data: volume } = useUserVolume({
		// 	address: userResponse?.payload?.address,
		// 	startDate,
		// 	endDate,
		// 	isCrossChain: step?.details?.isCrossChain,
		// 	chainIds: step?.details.chainIds,
		// })
		// const handleSwap = () => {
		// 	window.open(config.lancanURL, '_blank')
		// }
		// if (__IS_DEV__ && (typeof step?.details?.value !== 'string' || typeof step?.details?.value !== 'number')) {
		// 	console.warn('DEVELOPER!!!  step?.details?.value is not a number or string')
		// }
		// return (
		// 	<>
		// 		<ProgressBar
		// 			type="float"
		// 			currentValue={volume ?? Number(0)}
		// 			maxValue={Number(step?.details?.value)}
		// 			minValue={0}
		// 		/>
		// 		<div className={cls.controls}>
		// 			<Button variant={isSingleTask ? 'primary' : 'secondary_color'} onClick={handleSwap} size="l">
		// 				Swap
		// 			</Button>
		// 			<Button
		// 				variant={'tetrary_color'}
		// 				onClick={() => handleVerifyQuest({ quest, setErrorText, userQuest, userStep })}
		// 				isLoading={isPending}
		// 				size="l"
		// 			>
		// 				Verify
		// 			</Button>
		// 		</div>
		// 	</>
		// )

		return <span>progress_line</span>
	},
	connect_discord: function (props: TTaskActionProps): JSX.Element {
		return <span>progress_line</span>
	},
	connect_x: function (props: TTaskActionProps): JSX.Element {
		return <span>connect_x</span>
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
		return <span>google_form</span>
	},
}
