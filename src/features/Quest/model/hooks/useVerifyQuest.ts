import { action, category } from '@/constants/tracking'
import { TQuest, TQuestStep, useVerifyQuestMutation } from '@/entities/Quest'
import { useAddStepInProgressMutation } from '@/entities/User'
import { trackEvent } from '@/hooks/useTracking'
import { getEventTypeQuest } from '@/shared/lib/utils/events/getEventTypeQuest'
import { useAccount } from 'wagmi'

export const useVerifyQuest = () => {
	const { address } = useAccount()
	const { mutateAsync: verifyFn, isPending: isPendingVerify } = useVerifyQuestMutation()
	const { mutateAsync: addStepInProgress, isPending: isPendingAddStep } = useAddStepInProgressMutation()

	const handleVerify = ({
		quest,
		setErrorText,
		step,
	}: {
		quest: TQuest
		setErrorText: ((text: string) => void) | undefined
		step: TQuestStep
	}) => {
		if (quest && address) {
			verifyFn({
				address,
				questId: quest._id,
				stepId: step.id,
			})
				.then(res => {
					if (!res.status) {
						setErrorText?.(
							'You haven’t met the requirements for this task. Please complete it and try again.',
						)
						return
					}
					addStepInProgress({
						address,
						questId: quest._id,
						stepId: step.id,
					})
					trackEvent({
						category: category.QuestCard,
						action: action.SuccessQuest,
						label: 'concero_verify_quest_success',
						data: { id: quest._id, step: step.id, type: getEventTypeQuest(quest as TQuest) },
					})
				})
				.catch(e => {
					setErrorText?.('You haven’t met the requirements for this task. Please complete it and try again.')
					trackEvent({
						category: category.QuestCard,
						action: action.FailedQuest,
						label: 'concero_verify_quest_fail',
						data: { id: quest._id, step: step.id, type: getEventTypeQuest(quest as TQuest) },
					})
				})
			trackEvent({
				category: category.QuestCard,
				action: action.BeginQuest,
				label: 'concero_verify_quest_begin',
				data: { id: quest._id, step: step.id, type: getEventTypeQuest(quest as TQuest) },
			})
		}
	}

	return { handleVerify, isPendingVerify, isPendingAddStep }
}
