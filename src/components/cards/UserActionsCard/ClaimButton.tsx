import { UserActionStatus, type UserTransaction } from './UserActionsCard'
import { TransactionStatus } from '../../../api/concero/types'
import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { useAccount } from 'wagmi'
import { completeWithdrawal, retryWithdrawal } from '../PoolCard/swapExecution/requestWithdraw'
import { Button } from '../../buttons/Button/Button'
import classNames from './UserActionsCard.module.pcss'

interface Props {
	action: UserTransaction
	status: TransactionStatus
	setStatus: Dispatch<SetStateAction<TransactionStatus>>
}

export const ClaimButton = ({ action, status, setStatus }: Props) => {
	const { address, chainId } = useAccount()
	const isRetryRequestWithdraw = action.status === UserActionStatus.WithdrawRetryNeeded

	const handleCompleteWithdrawal = async () => {
		try {
			if (!address) return
			setStatus(TransactionStatus.PENDING)

			if (isRetryRequestWithdraw) {
				const txStatus = await retryWithdrawal(address, chainId!)
				setStatus(txStatus)
			} else {
				const txStatus = await completeWithdrawal(address, chainId!)
				setStatus(txStatus)
			}
		} catch (error) {
			setStatus(TransactionStatus.FAILED)
			console.error(error)
		}
	}

	const claimButton = (
		<Button size="sm" onClick={handleCompleteWithdrawal}>
			{isRetryRequestWithdraw ? 'Retry' : 'Claim'}
		</Button>
	)

	const stageButtonsMap: Record<TransactionStatus, ReactNode> = {
		[TransactionStatus.IDLE]: claimButton,
		[TransactionStatus.FAILED]: claimButton,
		[TransactionStatus.SUCCESS]: (
			<Button className={classNames.successButton} isDisabled={true} size="sm">
				Claimed success
			</Button>
		),
	}

	if (
		action.status === UserActionStatus.ActiveRequestWithdraw ||
		action.status === UserActionStatus.WithdrawRetryNeeded
	) {
		return stageButtonsMap[status]
	}

	return null
}
