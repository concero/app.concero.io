import { TQuest } from '@/entities/Quest'

export const getCountRequiredSteps = (quest: TQuest) => {
	return quest.tasks
		.filter(task => task.is_required)
		.reduce((sum, task) => {
			return (sum += task.steps.length)
		}, 0)
}
