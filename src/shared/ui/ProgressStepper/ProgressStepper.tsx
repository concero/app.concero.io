import cls from './ProgressStepper.module.pcss'

type TProgressStepProps = {
	status: 'default' | 'completed' | 'warning' | 'danger' | 'success' | 'current'
}

const ProgressStep = (props: TProgressStepProps) => {
	return <div className={cls['step_' + props.status]} />
}

type TProgressStepperProps = {
	currentProgress?: number
	max?: number
	status?: 'warning' | 'danger' | 'success'
}

export const ProgressStepper = (props: TProgressStepperProps) => {
	const { currentProgress = 0, max = 7, status } = props
	const steps: TProgressStepProps['status'][] = Array.from({ length: max }, (_, i) => {
		if (i < currentProgress - 1) return 'completed'
		if (i === currentProgress - 1) return status || 'current'
		return 'default'
	})

	return (
		<div className={cls.stepper}>
			{steps.map((stepStatus, index) => (
				<ProgressStep key={index} status={stepStatus} />
			))}
		</div>
	)
}
