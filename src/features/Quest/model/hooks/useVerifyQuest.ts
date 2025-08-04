import { TUserQuest, TUserStep, useVerifyQuestMutation } from '@/entities/Quest'
import { useVerifyQuestStepMutation } from '@/entities/Quest'
import { useAccount } from 'wagmi'

export const useVerifyQuest = () => {
	const { address } = useAccount()
	const { mutateAsync: handleVerifyStep, isPending: isPendingStep } = useVerifyQuestStepMutation()
	const { mutateAsync: verifyFn, isPending: isPendingQuest } = useVerifyQuestMutation()

	const handleVerify = ({
		setErrorText,
		onSuccessVerify,
		userStep,
		userQuest,
	}: {
		setErrorText: ((text: string) => void) | undefined
		onSuccessVerify: () => void
		userStep: TUserStep
		userQuest: TUserQuest
	}) => {
		if (address) {
			handleVerifyStep({
				address,
				user_step_id: userStep.id,
			})
				.then(res => {
					if (!res.payload.verified) {
						setErrorText?.(
							'You haven’t met the requirements for this task. Please complete it and try again.',
						)
						return
					}

					verifyFn({ address, user_quest_id: userQuest.id })
						.then(res => {
							if (!res.payload.verified) {
								setErrorText?.(
									'You haven’t met the requirements for this task. Please complete it and try again.',
								)
								return
							}
						})
						.catch(err => {
							setErrorText?.(
								'You haven’t met the requirements for this task. Please complete it and try again.',
							)
						})

					onSuccessVerify()
				})
				.catch(e => {
					setErrorText?.('You haven’t met the requirements for this task. Please complete it and try again.')
				})
		}
	}

	return { handleVerifyQuest: handleVerify, isPending: isPendingQuest || isPendingStep }
}
