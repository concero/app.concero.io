import classNames from './Stepper.module.pcss'

interface Props {
	steps: number
	completedSteps: number
}

export const Stepper = ({ steps, completedSteps }: Props) => {
	const isCompleted = completedSteps === steps

	return (
		<div className="gap-sm">
			<p className={classNames.title}>
				<b>Progress:</b> {completedSteps} <span>/</span> {steps}
			</p>
			<div className={classNames.steps}>
				{new Array(steps).fill('').map((_, i) => {
					const activeClass = completedSteps > i || isCompleted ? classNames.stepActive : ''

					return <div className={`${classNames.step} ${activeClass}`} key={i} />
				})}
			</div>
		</div>
	)
}
