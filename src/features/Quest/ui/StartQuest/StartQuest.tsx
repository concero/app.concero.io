import { TQuest } from '@/entities/Quest'
import { useAddQuestToProgressMutation } from '@/entities/User'
import { Button, TButtonProps } from '@concero/ui-kit'
import { useCallback } from 'react'
import { useAccount } from 'wagmi'

type TProps = {
	questId: TQuest['_id']
	onStart?: (points?: number) => void
	propsButton?: TButtonProps
	className?: string
}
export const StartQuest = ({ questId, onStart, className, propsButton }: TProps) => {
	const { address } = useAccount()
	const { mutate: addQuestInProgress } = useAddQuestToProgressMutation()
	const startTheQuest = useCallback(() => {
		if (address) {
			addQuestInProgress({ address, questId })
		}
		onStart?.()
	}, [])

	return (
		<Button onClick={startTheQuest} className={className} {...propsButton}>
			Start quest
		</Button>
	)
}
