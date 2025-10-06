import cls from './QuestTaskGroup.module.pcss'
import { TQuest, TUserQuest } from '@/entities/Quest'
import { getCountCompletedSteps } from '@/entities/Quest'
import { QuestTask } from '../QuestTask/QuestTask'
import { TaskActions } from '../TaskAction/TaskAction'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text/Text'
import { Stepper } from '@/shared/ui/Stepper/Stepper'

type TProps = {
	quest?: TQuest
	userQuest?: TUserQuest
	onlyOptional?: boolean
}
export const QuestTaskGroup = (props: TProps) => {
	const { quest, userQuest, onlyOptional } = props
	if (!quest || !userQuest) {
		return null
	}
	const completedSteps = getCountCompletedSteps({ userQuest })

	let listTaskToShow = []

	if (onlyOptional) {
		listTaskToShow = quest.tasks.filter(task => !task.is_required)
	} else {
		listTaskToShow = quest.tasks.filter(task => task.is_required)
	}
	listTaskToShow.sort((a, b) => (a?.sort_index ?? 0) - (b?.sort_index ?? 0))

	/**On claim this array is empty */
	const isSingleStep = listTaskToShow.length <= 1

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
		<VStack gap="space_0_5" className={cls.group}>
			{!isSingleStep && (
				<VStack gap="space_0_5" className={cls.group_heading}>
					<HStack gap="space_0_25">
						<Text variant="heading_small" className={cls.title}>
							Quest Progress:
						</Text>
						<Text variant="heading_medium" className={cls.completed_steps}>
							{completedSteps}
						</Text>
						<Text variant="body_large" className={cls.separator}>
							/
						</Text>
						<Text variant="heading_medium" className={cls.step_count}>
							{userQuest.steps.length}
						</Text>
					</HStack>
					<Stepper
						currentProgress={completedSteps}
						activeCells={Array.from({ length: completedSteps }, (_, i) => i + 1)}
						max={2}
						maxColumns={2}
						className={cls.stepper}
					/>
				</VStack>
			)}
			{listTaskToShow.map((task, index) => (
				<div key={index} className={cls.step_wrap}>
					<QuestTask task={task} quest={quest} TaskAction={TaskActions[task.type]} userQuest={userQuest} />
				</div>
			))}
		</VStack>
	)
}
