import { type Step } from '../../../../../../types/StandardRoute'
import classNames from './StepCard.module.pcss'
import { InnerStepCard } from './InnerStepCard/InnerStepCard'

interface StepCardProps {
	innerSteps: Step[] | null
	index: number
}

export function StepCard({ innerSteps, index }: StepCardProps) {
	return (
		<div className={classNames.container}>
			<div className={classNames.headerContainer}>
				<p className={'body1'}>Step {index + 1}</p>
			</div>
			<div className={classNames.stepsContainer}>
				{innerSteps?.map((innerStep: Step, i: number) => {
					return <InnerStepCard key={i.toString()} step={innerStep} />
				})}
			</div>
		</div>
	)
}
