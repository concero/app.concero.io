import { TQuest, TQuestStep } from '@/entities/Quest'
import cls from './QuestStepGroup.module.pcss'
import { StepActions } from '../StepActions/StepActions'
import { QuestStep } from '../QuestStep/QuestStep'
import { useAccount } from 'wagmi'
import { useUserByAddress } from '@/entities/User'

type TProps = {
	quest?: TQuest
	onlyOptional?: boolean
}
export const QuestStepGroup = (props: TProps) => {
	const { quest, onlyOptional } = props
	const { address } = useAccount()
	const { data: user } = useUserByAddress(address)
	if (!quest) {
		return null
	}
	const completedSteps = user?.questsInProgress.find(q => q.questId === quest?._id)?.completedSteps ?? []

	let listStepToShow = []

	if (onlyOptional) {
		listStepToShow = quest.steps.filter(step => step?.optional == true)
	} else {
		listStepToShow = quest.steps.filter(step => !(step?.optional == true))
	}

	const isSingleStep = listStepToShow.length < 2
	if (isSingleStep) {
		if (!listStepToShow[0]) return null
		return (
			<QuestStep
				showOnlyAction={true}
				quest={quest}
				step={listStepToShow[0]}
				isDone={completedSteps.includes(String(listStepToShow[0].id))}
				StepAction={StepActions[quest.steps[0].questAction]}
			/>
		)
	}

	return (
		<div className={cls.group}>
			{/* {!isSingleStep && `Progress: ${completedSteps.length}`} */}
			{listStepToShow.map((step, index) => (
				<div key={index} className={cls.step_wrap}>
					<QuestStep
						quest={quest}
						step={step}
						isDone={completedSteps.includes(String(step.id))}
						StepAction={StepActions[step.questAction]}
					/>
				</div>
			))}
		</div>
	)
}
