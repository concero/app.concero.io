import { TQuest, useClaimQuestMutation } from '@/entities/Quest'
import { TUserQuest } from '@/entities/Quest/model/types/response'
import { Button } from '@concero/ui-kit'
import { TButtonProps } from '@concero/ui-kit/dist/common/Button/Button'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type TProps = {
	userQuestId: TUserQuest['id']
	onClaim?: () => void
	propsButton?: TButtonProps
	className?: string
}
export const ClaimReward = ({ userQuestId, onClaim, className, propsButton }: TProps) => {
	const { address } = useAccount()
	const { mutateAsync: claimQuest, isPending } = useClaimQuestMutation()
	const [loadingWithDelay, setLoadingWithDelay] = useState(false)
	useEffect(() => {
		if (isPending) {
			const timer = setTimeout(() => {
				setLoadingWithDelay(true)
			}, 2000)

			return () => clearTimeout(timer)
		} else {
			setLoadingWithDelay(false)
		}
	}, [isPending])
	const claimThisQuest = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (address) {
			claimQuest({ address, user_quest_id: userQuestId })
				.then(res => {
					onClaim?.()
				})
				.catch(err => {
					console.error('@ClaimReward: ', err)
				})
		}
	}, [])

	return (
		<Button
			variant="primary"
			size="s"
			onClick={claimThisQuest}
			isLoading={loadingWithDelay}
			className={className}
			{...propsButton}
		>
			Claim reward
		</Button>
	)
}
