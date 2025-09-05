import { useAccount } from 'wagmi'
import cls from './QuestTaskGroup.module.pcss'
import { TQuest, TUserQuest } from '@/entities/Quest'
import { useUserByAddress } from '@/entities/User'
import { getCountCompletedSteps } from '@/entities/Quest'
import { QuestTask } from '../QuestTask/QuestTask'
import { TaskActions } from '../TaskAction/TaskAction'

type TProps = {
	quest?: TQuest
	userQuest?: TUserQuest
	onlyOptional?: boolean
}
export const QuestTaskGroup = (props: TProps) => {
	const { quest, userQuest, onlyOptional } = props
	// const { address } = useAccount()
	if (!quest || !userQuest) {
		return null
	}
	// const completedSteps = getCountCompletedSteps({ userQuest })

	let listTaskToShow = []

	if (onlyOptional) {
		listTaskToShow = quest.tasks.filter(task => !task.is_required)
	} else {
		listTaskToShow = quest.tasks.filter(task => task.is_required)
	}

	const isSingleStep = listTaskToShow.length === 1
	if (isSingleStep) {
		if (!listTaskToShow[0]) return null
		const task = listTaskToShow[0]
		return (
			<QuestTask
				showOnlyAction={true}
				task={task}
				quest={quest}
				TaskAction={TaskActions[task.type]}
				userQuest={userQuest}
			/>
		)
	}

	return (
		<div className={cls.group}>
			{/* {!isSingleStep && `Progress: ${completedSteps.length}`} */}
			{listTaskToShow.map((task, index) => (
				<div key={index} className={cls.step_wrap}>
					<QuestTask task={task} quest={quest} TaskAction={TaskActions[task.type]} userQuest={userQuest} />
				</div>
			))}
		</div>
	)
}
