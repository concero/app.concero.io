import { useState } from 'react'
import cls from './QuestStep.module.pcss'
import { Tag } from '@/components/layout/Tag/Tag'
import clsx from 'clsx'
import { SkeletonLoader } from '@/components/layout/SkeletonLoader/SkeletonLoader'
import { Loader } from '@/components/layout/Loader/Loader'
import { TQuestStep } from '@/entities/Quest'
import { TStepActionProps } from '../StepActions/StepActions'

type variant = 'testing' | 'rewards'
type TProps = {
	step: TQuestStep
	isCompleted?: boolean
	variant?: variant
	isLoading?: boolean
	isOptional?: boolean
	StepAction: (props: TStepActionProps) => JSX.Element
}

export const QuestStep = (props: TProps) => {
	const { step, isCompleted, isLoading = false, variant = 'rewards', isOptional = false, StepAction } = props
	const [errorText, setErrorText] = useState<string | undefined>()

	if (isLoading) {
		return (
			<div className={clsx(cls.step_wrap, cls.loading)}>
				<span className={cls.title} title={step.title}>
					<SkeletonLoader height={24} width={272} />
				</span>
				<div className={cls.spinner_wrap}>
					<Loader variant="neutral" />
				</div>
			</div>
		)
	}
	if (isCompleted) {
		return (
			<div className={clsx(cls.step_wrap, cls.done)}>
				<span className={cls.title} title={step.title}>
					{step.title}
				</span>
				{variant === 'rewards' && <Tag variant="positive">Done</Tag>}
			</div>
		)
	}

	return (
		<div className={cls.step_wrap}>
			<div className={cls.title_wrap}>
				<span className={cls.title} title={step.title}>
					{step.title}
				</span>
				{true && <Tag variant="neutral">Optional</Tag>}
			</div>
			<div className={cls.description}>{step.description}</div>
			<StepAction step={step} setErrorText={setErrorText} />
			{errorText ? <span className={cls.error_text}>{errorText}</span> : null}
		</div>
	)
}
