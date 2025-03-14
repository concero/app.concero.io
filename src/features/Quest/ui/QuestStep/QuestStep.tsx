import { useState } from 'react'
import cls from './QuestStep.module.pcss'
import clsx from 'clsx'
import { TQuest, TQuestStep } from '@/entities/Quest'
import { TStepActionProps } from '../StepActions/StepActions'
import { Tag } from '@concero/ui-kit'

type TVariant = 'testing' | 'rewards'
type TProps = {
	quest: TQuest
	step: TQuestStep
	isDone?: boolean
	variant?: TVariant
	showOnlyAction?: boolean
	StepAction: ((props: TStepActionProps) => JSX.Element) | null
}

export const QuestStep = (props: TProps) => {
	const { quest, step, isDone, variant = 'rewards', StepAction, showOnlyAction } = props
	const [errorText, setErrorText] = useState<string | undefined>()
	const isOptional: boolean = step?.optional ?? false

	if (isDone) {
		return (
			<div className={clsx(cls.step_wrap, cls.done)}>
				<span className={cls.title} title={step.title}>
					{step.title}
				</span>
				{variant === 'rewards' && !isOptional && <Tag variant="positive">Done</Tag>}
			</div>
		)
	}
	if (showOnlyAction && !step.optional) {
		return (
			<div className={clsx(cls.step_wrap, cls.single_step)}>
				{StepAction ? <StepAction step={step} setErrorText={setErrorText} quest={quest} /> : null}
				{errorText ? <span className={cls.error_text}>{errorText}</span> : null}
			</div>
		)
	}
	return (
		<div className={cls.step_wrap}>
			<div className={cls.title_wrap}>
				<span className={cls.title} title={step.title}>
					{step.title}
				</span>
				{step.optional && <Tag variant="neutral">Optional</Tag>}
			</div>
			<div className={cls.description}>{step.description}</div>
			{StepAction ? <StepAction step={step} setErrorText={setErrorText} quest={quest} /> : null}
			{errorText ? <span className={cls.error_text}>{errorText}</span> : null}
		</div>
	)
}
