import { TQuest, useClaimQuestMutation } from '@/entities/Quest'
import { Button } from '@concero/ui-kit'
import { TButtonProps } from '@concero/ui-kit/dist/common/Button/Button'
import { useCallback } from 'react'
import { useAccount } from 'wagmi'

type TProps = {
	questId: TQuest['_id']
	onClaim?: (points?: number) => void
	propsButton?: TButtonProps
	className?: string
}
export const ClaimReward = ({ questId, onClaim, className, propsButton }: TProps) => {
	const { address } = useAccount()
	const { mutateAsync: claimQuest } = useClaimQuestMutation()
	const claimThisQuest = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (address) {
			claimQuest({ address, questId })
				.then(res => {
					onClaim?.(res.points)
				})
				.catch(err => {
					console.error('@ClaimReward: ', err)
				})
		}
	}, [])

	return (
		<Button variant="primary" size="s" onClick={claimThisQuest} className={className} {...propsButton}>
			Claim reward
		</Button>
	)
}
