import { TUserQuest } from '@/entities/Quest'

export const getCountCompletedSteps = ({ userQuest }: { userQuest?: TUserQuest }) => {
	if (!userQuest) return 0
	return userQuest.steps.filter(step => step.status == 'done').length
}
