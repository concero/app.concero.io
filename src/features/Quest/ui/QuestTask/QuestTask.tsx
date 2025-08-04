import { TQuest, TQuestTask, TUserQuest } from '@/entities/Quest'
import cls from './QuestTask.module.pcss'
import clsx from 'clsx'
import { Tag } from '@concero/ui-kit'
import { useState } from 'react'
import { TaskActions, TTaskActionProps } from '../TaskAction/TaskAction'
import { trackEvent } from '@/hooks/useTracking'
import { action, category } from '@/constants/tracking'
import { getEventTypeQuest } from '@/shared/lib/utils/events/getEventTypeQuest'
type TProps = {
	quest: TQuest
	task: TQuestTask
	userQuest: TUserQuest
	showOnlyAction?: boolean
	TaskAction: ((props: TTaskActionProps) => JSX.Element) | null
}

export const QuestTask = (props: TProps) => {
	const { quest, task, userQuest, showOnlyAction, TaskAction } = props
	const [errorText, setErrorText] = useState<string | undefined>()
	const handlerErrorVerify = (text: string) => {
		setErrorText(text)
		trackEvent({
			category: category.QuestCard,
			action: action.FailedQuest,
			label: 'concero_verify_quest_fail',
			data: {
				id: userQuest.questId,
				task: task.id,
				type: getEventTypeQuest(quest as TQuest),
			},
		})
	}
	const handleSuccessVerify = () => {
		trackEvent({
			category: category.QuestCard,
			action: action.SuccessQuest,
			label: 'concero_verify_quest_success',
			data: {
				id: userQuest.questId,
				task: task.id,
				type: getEventTypeQuest(quest as TQuest),
			},
		})
	}
	const onStartVerify = () => {
		trackEvent({
			category: category.QuestCard,
			action: action.BeginQuest,
			label: 'concero_verify_quest_begin',
			data: { id: userQuest.questId, task: task.id, type: getEventTypeQuest(quest as TQuest) },
		})
	}
	const isDone = userQuest.steps
		.filter(userStep => task.steps.find(step => step.id === userStep.stepId))
		.every(step => step.status === 'done')
	const isOptional = task.is_required
	if (isDone) {
		return (
			<div className={clsx(cls.step_wrap, cls.done)}>
				<span className={cls.title} title={task.title}>
					{task.title}
				</span>
				{!isOptional && <Tag variant="positive">Done</Tag>}
			</div>
		)
	}
	if (showOnlyAction && !isOptional) {
		return (
			<div className={clsx(cls.step_wrap, cls.single_step)}>
				{TaskAction ? (
					<TaskAction
						userQuest={userQuest}
						setErrorText={handlerErrorVerify}
						onSuccessVerify={handleSuccessVerify}
						onStartVerify={onStartVerify}
						quest={quest}
						task={task}
					/>
				) : null}
				{errorText ? <span className={cls.error_text}>{errorText}</span> : null}
			</div>
		)
	}
	return (
		<div className={cls.step_wrap}>
			<div className={cls.title_wrap}>
				<span className={cls.title} title={task.title}>
					{task.title}
				</span>
				{isOptional && <Tag variant="neutral">Optional</Tag>}
			</div>
			<div className={cls.description}>{task.description}</div>
			{TaskAction ? (
				<TaskAction
					userQuest={userQuest}
					setErrorText={handlerErrorVerify}
					onSuccessVerify={handleSuccessVerify}
					onStartVerify={onStartVerify}
					quest={quest}
					task={task}
				/>
			) : null}
			{errorText ? <span className={cls.error_text}>{errorText}</span> : null}
		</div>
	)
}
