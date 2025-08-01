import { TQuest } from '@/entities/Quest'
import { TUserResponse } from '../types/response'
import { getCompletedStepsByQuest } from './getCompletedStepsByQuest'

export const getIsDoneQuest = (quest?: TQuest, user?: TUserResponse) => {
	if (!quest || !user) return false
	const completedSteps = getCompletedStepsByQuest(quest.id, user)
	if (quest.steps.filter(step => !step?.optional).length === completedSteps.length) {
		return true
	}
	return false
}
