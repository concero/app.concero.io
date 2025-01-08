import { type SwapButtonProps } from './types'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { Button } from '../../../buttons/Button/Button'

export const SwapButton = ({ onClick, isLoading, isDeposit, isDepositDisabled }: SwapButtonProps) => {
	const { isConnected } = useAccount()
	const { open } = useAppKit()

	const actionText: string = isDeposit ? 'Request Deposit' : 'Request Withdrawal'
	const isDisabled: boolean = (isDeposit && isDepositDisabled) || !isConnected

	return (
		<Button
			isFull
			size="lg"
			variant="primary"
			isLoading={isLoading}
			onClick={isConnected ? e => onClick(e) : () => open()}
			isDisabled={isDisabled}
		>
			{isConnected ? actionText : 'Connect Wallet'}
		</Button>
	)
}
