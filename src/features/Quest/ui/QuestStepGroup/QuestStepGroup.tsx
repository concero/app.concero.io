import { QuestStep, TQuest, TQuestStep } from '@/entities/Quest'
import cls from './QuestStepGroup.module.pcss'
import { StepActions } from '../StepActions/StepActions'

type TProps = {
	quest?: TQuest
	completedSteps?: TQuestStep['id'][]
}
export const QuestStepGroup = (props: TProps) => {
	const { quest, completedSteps = [] } = props

	return (
		<div className={cls.group}>
			Progress: {completedSteps.length}
			{quest?.steps?.map((step, index) => (
				<div key={index} className={cls.step_wrap}>
					<QuestStep
						step={step}
						isCompleted={completedSteps.includes(step.id)}
						StepAction={StepActions[step.questAction]}
					/>
				</div>
			))}
		</div>
	)
}
