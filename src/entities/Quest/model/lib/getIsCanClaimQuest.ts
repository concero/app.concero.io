import { TQuest } from '@/entities/Quest'
import { TUserQuest } from '@/entities/Quest'

export const getIsCanClaimQuest = ({ userQuest, quest }: { userQuest?: TUserQuest; quest?: TQuest }) => {
	if (!quest || !userQuest) return false
	const completedSteps = userQuest.steps.filter(step => step.status == 'done')
	const stepsCount = quest.tasks
		.filter(task => task.is_required)
		.reduce((sum, task) => {
			return sum + task.steps.length
		}, 0)

	if (completedSteps.length === stepsCount && !userQuest.finished_at) {
		return true
	}
	return false
}
